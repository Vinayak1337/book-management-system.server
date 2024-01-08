import User from '../api/user/user.model.js';
import { verifyToken } from './jwt.js';
import handleError from '../utils/handleError.js';

export default async function authenticate(req, res, next) {
	try {
		let token = req.headers.authorization;
		if (!token) return res.status(401).json({ message: 'Unauthorized.' });

		token = token.replace('Bearer ', '');

		const payload = await verifyToken(token);

		const user = await User.findById(payload.id)
			.select('-password')
			.lean()
			.exec();

		if (!user) return res.status(401).json({ message: 'Unauthorized.' });

		req.user = user;
		next();
	} catch (error) {
		const structuredError = handleError(error);
		res.status(structuredError.status).json(structuredError);
	}
}
