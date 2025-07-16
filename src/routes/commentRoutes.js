import express from 'express';
import * as commentController from '../controllers/commentController.js';
import { authenticateToken } from '../middlewares/auth.js';
import { authorizeSelfOrAdmin } from '../middlewares/authorize.js';

const commentRouter = express.Router();

commentRouter.get('/', commentController.getAllComments);
commentRouter.get('/:id', commentController.getCommentById);
commentRouter.post(
    '/posts/:postId/comments',
    authenticateToken,
    commentController.createComment
);
commentRouter.put('/:id', authenticateToken, authorizeSelfOrAdmin, commentController.updateComment);
commentRouter.delete('/:id', authenticateToken, authorizeSelfOrAdmin, commentController.deleteComment);

export default commentRouter;
