import mongoose from 'mongoose';
import chalk from 'chalk';

/**
 * @typedef {Object} GridFS
 * @property {mongoose.mongo.GridFSBucket} Bucket
 */
const GridFS = {
	/**
	 * @type {mongoose.mongo.GridFSBucket}
	 */
	Bucket: null
};

const connectGridFS = () => {
	mongoose.connection.once('open', () => {
		GridFS.Bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
			bucketName: 'thumbnails'
		});

		console.log(chalk.green('Connected to GridFS'));
	});
};

export default GridFS;

export { connectGridFS };
