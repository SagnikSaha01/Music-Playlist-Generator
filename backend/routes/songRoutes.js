import { Router } from 'express';

import { login, createPlaylist, callback, logout, addSongs } from '../controllers/spotifyFunctions.js';

const router = Router();


router.get('/spotifylogin', login);
router.get('/callback', callback);
router.get('/create', createPlaylist);
router.get('/add', addSongs);
router.get('/logout', logout);

export default router;
