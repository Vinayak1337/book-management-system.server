// @ts-check
'use strict';

import routes from '../api/index.js';

/**
 *
 * @param {import('express').Express} app
 */
const initRoutes = app => {
	for (const [path, { router, middlewares = [] }] of Object.entries(routes))
		app.use(path, ...middlewares, router);
};

export default initRoutes;
