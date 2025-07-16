import express from 'express';
import postRouter from './postRoutes.js';
import userRouter from './userRoutes.js';
import commentRouter from './commentRoutes.js';
import authenticationRouter from './authenticationRoutes.js';

const indexRouter = express.Router();
indexRouter.use('/posts', postRouter);
indexRouter.use('/users', userRouter);
indexRouter.use('/comments', commentRouter);
indexRouter.use('/login', authenticationRouter);

export default indexRouter;
