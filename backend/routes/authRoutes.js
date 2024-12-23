import { Router } from 'express';

import { login, register } from '../controllers/authController.js';

const router = Router();

router.get('/', (req, res) => {
    res.send("Hello from authRoutes.js");
});
router.post('/login', login);
router.post('/register', register);

export default router;
