// @ts-check
'use strict';

import mongoose from 'mongoose';
import chalk from 'chalk';
import config from './config.js';
import { connectGridFS } from './bucket.js';

const { green, red } = chalk;

const connectDb = () => {
	try {
		connectGridFS();
		mongoose.connect(config.MONGO_URI);

		console.log(green('Connected to MongoDB'));
	} catch (error) {
		console.error(red(error));
	}
};

export default connectDb;
