import handleError from '../../utils/handleError.js';

export const getUserProfile = async (req, res) => {
	try {
		const user = req.user;
		res.status(200).json(user);
	} catch (error) {
		const structuredError = handleError(error);
		res.status(structuredError.status).json(structuredError);
	}
};
