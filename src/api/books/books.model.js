// @ts-check
import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const booksSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'Title is required.'],
			trim: true,
			unique: true,
			validate: [titleValidator, 'A book with the same title already exists.']
		},
		thumbnail: {
			type: String,
			required: [true, 'Thumbnail is required.'],
			trim: true
		},
		author: {
			type: SchemaTypes.ObjectId,
			ref: 'User'
		},
		description: {
			type: String,
			trim: true
		},
		published: {
			type: Boolean,
			default: true
		}
	},
	{ timestamps: true }
);

/**
 * @param {string} title
 * @returns {Promise<boolean>}
 */
async function titleValidator(title) {
	try {
		const book = await this.constructor.findOne({ title });
		return !book;
	} catch (error) {
		throw error;
	}
}

const Books = model('Books', booksSchema);

export default Books;
