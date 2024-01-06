import User from '../api/user/user.model.js';
import { verifyToken } from './jwt.js';

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
		res.status(500).json(handleError(error));
	}
}
