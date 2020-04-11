import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';
import 'express-async-errors'; // deve ser importando antes das rotas
import routes from './routes';
import './database/index';

class App {
    constructor() {
        this.server = express();
        Sentry.init(sentryConfig);

        this.middlewares();
        this.routes();
        this.execptionHandle();
    }

    middlewares() {
        this.server.use(Sentry.Handlers.requestHandler());
        this.server.use(cors());
        this.server.use(express.json()); // o servidor pode suportar requisição com json.
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
        );
    }

    routes() {
        this.server.use(routes);
        this.server.use(Sentry.Handlers.errorHandler());
    }

    execptionHandle() {
        this.server.use(async (err, req, res, next) => {
            const errors = await new Youch(err, req).toJSON();
            if (process.env.NODE_ENV === 'development') {
                return res.status(500).json(errors);
            }
            return res.status(500).json({ error: 'Internal server error' });
        });
    }
}

export default new App().server; // somente o server faz sentido ser acessado de fora dessa classe
