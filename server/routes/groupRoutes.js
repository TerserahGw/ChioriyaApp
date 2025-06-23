import express from 'express';
import { createGroup, getGroupById, updateGroup, joinGroup, getGroupRoles, createRole, updateRole, deleteRole, createRoom, updateRoom, deleteRoom } from '../controllers/groupController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createGroup);
router.get('/:id', protect, getGroupById);
router.put('/:id', protect, updateGroup);
router.post('/join', protect, joinGroup);

router.get('/:groupId/roles', protect, getGroupRoles);
router.post('/:groupId/roles', protect, createRole);
router.put('/roles/:roleId', protect, updateRole);
router.delete('/roles/:roleId', protect, deleteRole);

router.post('/:groupId/rooms', protect, createRoom);
router.put('/rooms/:roomId', protect, updateRoom);
router.delete('/rooms/:roomId', protect, deleteRoom);

export default router;