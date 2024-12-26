import { Router } from 'express';

import { login, register, profile, logout} from '../controllers/authController.js';

const router = Router();

router.get('/', (req, res) => {
    res.send("Hello from authRoutes.js");
});
router.post('/login', login);
router.post('/register', register);
router.get('/profile', profile);
router.get('/logout', logout);

export default router;
