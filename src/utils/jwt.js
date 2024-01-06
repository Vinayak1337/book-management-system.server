import jwt from 'jsonwebtoken';
import config from './config.js';

export const createToken = id =>
	jwt.sign({ id }, config.JWT_SECRET, {
		expiresIn: config.JWT_EXPIRATION_MS / 1000
	});

export const verifyToken = token =>
	new Promise((resolve, reject) => {
		jwt.verify(token, config.JWT_SECRET, (error, payload) => {
			if (error) return reject(error);
			resolve(payload);
		});
	});
