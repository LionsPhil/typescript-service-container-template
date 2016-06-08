"use strict";

/* Import libraries **********************************************************/

import * as express from 'express';
import * as winston from 'winston';

import * as hello from './hello';

/* Set up Winston for logging ************************************************/

let logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({
			timestamp: () => {
				return (new Date).toISOString();
			},
			handleExceptions: true
		})
	]
});

logger.info('Hello starting');

/* Set up doing something useful *********************************************/

let app = express();

app.get("/", (request, response) => {
	response.send(hello.greeting());
});

let server = app.listen(8080);

/* Set up exit handler *******************************************************/

process.on('exit', () => {
	logger.info('Hello stopping');

	if(server !== undefined) {
		server.close();
	}
});

process.on('SIGINT',  () => { process.exit(0); });
process.on('SIGTERM', () => { process.exit(0); });

/* Done, process held open by I/O ********************************************/

logger.info('Hello started');
