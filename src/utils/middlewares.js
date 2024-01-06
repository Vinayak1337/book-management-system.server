'use strict';

import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import config from './config.js';
import fs from 'fs';

const swaggerConfig = JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'));

/**
 * @param {import('express').Application} app
 */
const initMiddlewares = app => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(
		cors({
			origin: config.ALLOWED_ORIGINS.split(',').map(origin => origin.trim()),
			optionsSuccessStatus: 200
		})
	);
	app.use(morgan('dev'));
	app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
};

export default initMiddlewares;
