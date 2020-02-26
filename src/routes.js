import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store);

routes.get('/', async (req, res) => {
    res.json('Hellow World');
});
export default routes;
