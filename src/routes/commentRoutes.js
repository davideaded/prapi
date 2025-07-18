import express from 'express';
import * as commentController from '../controllers/commentController.js';
import { authenticateToken } from '../middlewares/auth.js';
import { authorizeRoles, authorizeUserOrAdmin } from '../middlewares/authorize.js';

const commentRouter = express.Router();

commentRouter.get('/', commentController.getAllComments);
commentRouter.get('/:id', commentController.getCommentById);
commentRouter.get('/bypost/:id', commentController.getCommentsByPostId);

commentRouter.post(
    '/posts/:postId/comments',
    authenticateToken,
    commentController.createComment
);

commentRouter.put(
    '/:id',
    authenticateToken,
    authorizeUserOrAdmin(req => +req.params.id),
    commentController.updateComment
);

commentRouter.delete(
    '/:id',
    authenticateToken,
    authorizeUserOrAdmin(req => +req.params.id),
    commentController.deleteComment
);

export default commentRouter;
