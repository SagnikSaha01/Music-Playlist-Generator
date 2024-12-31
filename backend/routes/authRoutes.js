import { Router } from 'express';

import { login, register, profile, logout} from '../controllers/authController.js';

import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', (req, res) => {
    res.send("Hello from authRoutes.js");
});
router.post('/login', login);
router.post('/register', register);
router.get('/profile', isAuthenticated, profile);
router.get('/logout', isAuthenticated, logout);

export default router;
