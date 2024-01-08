// @ts-check

/**
 *
 * @param {*} err
 * @returns {{message: string, status: number, code: number, entity: object }}}
 */
export default function handleError(err) {
	console.error(err);

	if (err.name === 'ValidationError') {
		return {
			message: err.message,
			status: 400,
			code: err.code,
			entity: Object.keys(err.errors)
				.map(key => ({
					[key]: err.errors[key].message
				}))
				.reduce((acc, curr) => ({ ...acc, ...curr }), {})
		};
	}

	if (err.code === 11000) {
		return {
			message: 'Entity already exists.',
			status: 400,
			code: err.code,
			entity: err.keyValue
		};
	}

	if (err.name === 'CastError') {
		return {
			message: 'Invalid ID.',
			status: 400,
			code: err.code,
			entity: err.value
		};
	}

	if (err.name === 'JsonWebTokenError') {
		return {
			message: 'Invalid token.',
			status: 401,
			code: err.code,
			entity: err.message
		};
	}

	if (err.name === 'TokenExpiredError') {
		return {
			message: 'Token expired.',
			status: 401,
			code: err.code,
			entity: err.message
		};
	}

	if (err.name === 'MongoError') {
		return {
			message: err.message,
			status: 500,
			code: err.code,
			entity: err.keyValue
		};
	}

	return {
		message: err.message,
		status: 500,
		code: err.code,
		entity: err
	};
}
