import { Router } from 'express';
import {
	createBook,
	getAllPublishedBooks,
	getUserPublishedBooks,
	searchBooksByTitle,
	unpublishBookById
} from './books.controller.js';
import upload from '../../utils/storage.js';

const booksRouter = Router();

booksRouter.route('/publish').post(upload.single('thumbnail'), createBook);
booksRouter.route('/unpublish/:id/').delete(unpublishBookById);
booksRouter.route('/user').get(getUserPublishedBooks);
booksRouter.route('/published').get(getAllPublishedBooks);
booksRouter.route('/search').get(searchBooksByTitle);

export default booksRouter;
