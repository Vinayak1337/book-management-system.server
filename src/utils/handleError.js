export default function handleError(err) {
	console.error(err);

	return {
		error: err.message,
		status: err.status
	};
}
