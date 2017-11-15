import { Router } from 'express';

const router = Router();

// Get users
router.get('/users', (req, res) => {
    res.json({
        message: 'not implemented'
    });
});

export = router;
