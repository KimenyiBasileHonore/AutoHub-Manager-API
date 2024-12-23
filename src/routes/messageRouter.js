import express from 'express';
import { sendMessage, getMessages, getUnreadMessagesCount } from '../controllers/messageController';
import checkAuth from '../middleware/CheckAuth';

const router = express.Router();


router.post('/send', checkAuth, sendMessage);

router.get('/get-messages', checkAuth, getMessages);

router.get('/unread-count', checkAuth, getUnreadMessagesCount);

module.exports =router;
