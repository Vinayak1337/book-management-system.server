// @ts-check

import GridFS from '../../utils/bucket.js';
import Books from './books.model.js';
import handleError from '../../utils/handleError.js';

export const getUserPublishedBooks = async (req, res) => {
	try {
		const user = req.user;
		const books = await Books.find({ author: user._id, published: true })
			.lean()
			.exec();

		res.status(200).json(books);
	} catch (error) {
		const structuredError = handleError(error);
		res.status(structuredError.status).json(structuredError);
	}
};

export const getAllPublishedBooks = async (req, res) => {
	try {
		let { limit = 10, page = 1 } = req.query;

		limit = parseInt(limit);
		page = parseInt(page);

		if (isNaN(limit) || isNaN(page))
			return res.status(400).json({ message: 'Invalid query parameters.' });

		const skip = (page - 1) * limit;

		const total = await Books.countDocuments({ published: true });
		const books = await Books.find({ published: true })
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 })
			.lean()
			.exec();

		res.status(200).json({ books, total });
	} catch (error) {
		const structuredError = handleError(error);
		res.status(structuredError.status).json(structuredError);
	}
};

export const unpublishBookById = async (req, res) => {
	try {
		const { id } = req.params;
		const user = req.user;

		const book = await Books.findOneAndUpdate(
			{ _id: id, author: user._id },
			{ published: false },
			{ new: true }
		)
			.lean()
			.exec();

		if (!book) return res.status(404).json({ message: 'Book not found.' });

		res.status(200).json({ message: 'Book unpublished successfully.' });
	} catch (error) {
		const structuredError = handleError(error);
		res.status(structuredError.status).json(structuredError);
	}
};

export const publishBookById = async (req, res) => {
	try {
		const { id } = req.params;
		const user = req.user;

		const book = await Books.findOneAndUpdate(
			{ _id: id, author: user._id },
			{ published: true },
			{ new: true }
		)
			.lean()
			.exec();

		if (!book) return res.status(404).json({ message: 'Book not found.' });

		res.status(200).json({ message: 'Book published successfully.' });
	} catch (error) {
		const structuredError = handleError(error);
		res.status(structuredError.status).json(structuredError);
	}
};

export const createBook = async (req, res) => {
	try {
		const { filename } = req.file || {};

		if (!filename)
			return res.status(400).json({ message: 'Thumbnail is required.' });

		const user = req.user;
		const book = await Books.create({
			...req.body,
			author: user._id,
			thumbnail: filename
		});

		res.status(201).json(book);
	} catch (error) {
		const structuredError = handleError(error);
		res.status(structuredError.status).json(structuredError);
	}
};

export const getBookThumbnail = async (req, res) => {
	try {
		const { id } = req.params;

		const book = await Books.findById(id).lean().exec();

		if (!book) return res.status(404).json({ message: 'Book not found.' });

		const thumbnail = await GridFS.Bucket.find({
			filename: book.thumbnail
		}).toArray();

		if (!thumbnail?.length)
			return res.status(404).json({ message: 'Thumbnail not found.' });

		res.set('Content-Type', thumbnail[0].contentType);
		res.set('Content-Length', thumbnail[0].length);

		const stream = GridFS.Bucket.openDownloadStream(thumbnail[0]._id);
		stream.pipe(res);
	} catch (error) {
		const structuredError = handleError(error);
		res.status(structuredError.status).json(structuredError);
	}
};

export const searchBooksByTitle = async (req, res) => {
	try {
		const { title } = req.query;

		if (!title) return res.status(400).json({ message: 'Title is required.' });

		const queryTitle = title.trim();
		const queryWords = queryTitle.split(' ');

		const books = await Books.aggregate([
			{
				$addFields: {
					titleWords: { $split: ['$title', ' '] }
				}
			},
			{
				$match: { title: { $regex: queryTitle, $options: 'i' } }
			},
			{
				$addFields: {
					matchScore: {
						$size: { $setIntersection: ['$titleWords', queryWords] }
					}
				}
			},
			{
				$sort: { matchScore: -1, title: 1 }
			}
		]).exec();

		res.status(200).json(books);
	} catch (error) {
		const structuredError = handleError(error);
		res.status(structuredError.status).json(structuredError);
	}
};
