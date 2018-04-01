import { Router } from 'express';

export const ApiRouter = Router();

// Get users
ApiRouter.get('/users', (req, res) => {
    res.json({
        message: 'not implemented'
    });
});
