import http from 'node:http';
import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { config } from '../config/index.js';

export class ExpressApp {
	private _app: Application;

	constructor() {
		this._app = express();

		this._app.use(express.urlencoded({ extended: true }));
		this._app.use(express.static('public'));
		this._app.use(express.json());
		this._app.use(cookieParser());
		this._app.use(
			cors({
				origin: config.CLIENT_URL,
				credentials: true,
			})
		);
	}

	get instance() {
		return this._app;
	}

	init(port: number) {
		http.createServer(this._app).listen(port, () => {
			console.log('Server started on port ' + port);
		});
	}
}
