import authenticate from '../utils/authenticate.js';
import authRouter from './auth/auth.router.js';
import booksRouter from './books/books.router.js';
import userRouter from './user/user.router.js';

const routes = {
	'/auth': {
		router: authRouter,
		middlewares: []
	},
	'/user': {
		router: userRouter,
		middlewares: [authenticate]
	},
	'/books': {
		router: booksRouter,
		middlewares: [authenticate]
	}
};

export default routes;
