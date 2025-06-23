import express from 'express';
import { sendFriendRequest, getFriendRequests, respondFriendRequest, getFriends, removeFriend } from '../controllers/friendController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/request', protect, sendFriendRequest);
router.get('/requests', protect, getFriendRequests);
router.put('/requests/:requestId', protect, respondFriendRequest);
router.get('/', protect, getFriends);
router.delete('/:friendId', protect, removeFriend);

export default router;