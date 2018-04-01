import { Router } from 'express';
import { Index, ApiRoute } from './api/base';

// import all routes
const apiRoutes: ApiRoute[] = [new Index];

// user API
import { User } from './api/user';
apiRoutes.push(new User);

// mount all API routes
export const ApiRouter = Router();
apiRoutes.forEach(apiRoute => apiRoute.mountRoutes(ApiRouter));
// final catch-all route for invalid API path
ApiRouter.get('*', (req, res) => {
    res.sendStatus(404);
});
