import { Router } from 'express';
import {
	createBook,
	getAllPublishedBooks,
	getBookThumbnail,
	getUserPublishedBooks,
	searchBooksByTitle,
	unpublishBookById
} from './books.controller.js';
import upload from '../../utils/storage.js';

const booksRouter = Router();

booksRouter.route('/publish').post(upload.single('thumbnail'), createBook);
booksRouter.route('/unpublish/:id').post(unpublishBookById);
booksRouter.route('/user').get(getUserPublishedBooks);
booksRouter.route('/published').get(getAllPublishedBooks);
booksRouter.route('/search').get(searchBooksByTitle);
booksRouter.route('/:id/thumbnail').get(getBookThumbnail);

export default booksRouter;
