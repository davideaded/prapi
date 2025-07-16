import express from 'express';
import * as userController from '../controllers/userController.js'
import { authenticateToken } from '../middlewares/auth.js';
import { authorizeSelfOrAdmin } from '../middlewares/authorize.js';

const userRouter = express.Router();

userRouter.get('/:id', userController.getUserById);
userRouter.put('/:id', authenticateToken, authorizeSelfOrAdmin, userController.updateUser);
userRouter.post('/', userController.createUser);
userRouter.delete('/:id', authenticateToken, authorizeSelfOrAdmin, userController.deleteUser);

export default userRouter;
