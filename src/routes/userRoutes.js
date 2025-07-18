import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/auth.js';
import { authorizeRoles, authorizeUserOrAdmin } from '../middlewares/authorize.js';

const userRouter = express.Router();

userRouter.get(
    '/:id',
    authenticateToken,
    authorizeUserOrAdmin(req => +req.params.id),
    userController.getUserById);

userRouter.put(
    '/:id',
    authenticateToken,
    authorizeUserOrAdmin(req => +req.params.id),
    userController.updateUser
);

userRouter.post('/', userController.createUser);

userRouter.delete(
    '/:id',
    authenticateToken,
    authorizeUserOrAdmin(req => +req.params.id),
    userController.deleteUser
);

export default userRouter;
