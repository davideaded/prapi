import express from 'express';
import * as commentController from '../controllers/commentController.js';

const commentRouter = express.Router();

commentRouter.get('/', commentController.getAllComments);
commentRouter.get('/:id', commentController.getCommentById);
commentRouter.post('/', commentController.createComment);
commentRouter.put('/:id', commentController.updateComment);
commentRouter.delete('/:id', commentController.deleteComment);

export default commentRouter;
