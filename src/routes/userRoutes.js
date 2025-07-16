import express from 'express';
import * as userController from'../controllers/userController.js'
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send('hello post');
});
userRouter.get('/:id', (req, res) => {
    res.send('hello post id');
});
userRouter.put('/:id', (req, res) => {
    res.send('edit post');
});
userRouter.post('/', userController.createUser);
userRouter.delete('/:id', (req, res) => {
    res.send('delete post');
});

export default userRouter;
