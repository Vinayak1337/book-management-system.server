// @ts-check
'use strict';

import express from 'express';
import chalk from 'chalk';
import config from './utils/config.js';
import connectDb from './utils/connect-db.js';
import initMiddlewares from './utils/middlewares.js';
import initRoutes from './utils/routes.js';

const { green, red } = chalk;

const app = express();

app.get('/', (_, res) => {
	res.send('Hello World!');
});

export default async function startServer() {
	try {
		initMiddlewares(app);
		initRoutes(app);
		connectDb();
		app.listen(config.PORT, appCallback);
	} catch (error) {
		console.error(red(error));
	}
}

function appCallback() {
	if (config.ENV === 'development')
		import('express-list-routes').then(({ default: listRoutes }) =>
			listRoutes(app)
		);

	console.log(green(`Server running on port ${config.PORT}`));
}
