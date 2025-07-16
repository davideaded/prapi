import express from 'express';
import * as userController from'../controllers/userController.js'
const userRouter = express.Router();

userRouter.get('/:id', userController.getUserById);
userRouter.put('/:id', userController.updateUser);
userRouter.post('/', userController.createUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
