import handleError from '../../utils/handleError.js';
import { createToken } from '../../utils/jwt.js';
import User from '../user/user.model.js';

export const register = async (req, res) => {
	try {
		const body = req.body;

		const user = await User.create(body);

		const token = createToken(user._id);

		res.status(201).json({ token, userId: user._id });
	} catch (error) {
		const structuredError = handleError(error);
		res.status(structuredError.status).json(structuredError);
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password)
			return res
				.status(400)
				.json({ message: 'Email and password are required.' });

		const user = await User.findOne({ email });

		if (!user) return res.status(400).json({ message: 'Invalid credentials.' });

		const isMatch = await user.comparePassword(password);

		if (!isMatch)
			return res.status(400).json({ message: 'Invalid credentials.' });

		const token = createToken(user._id);

		res.status(200).json({ token, userId: user._id });
	} catch (error) {
		const structuredError = handleError(error);
		res.status(structuredError.status).json(structuredError);
	}
};
