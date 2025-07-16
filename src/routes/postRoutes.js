import express from 'express';
import * as postController from '../controllers/postController.js';
import { authenticateToken } from '../middlewares/auth.js';
import { authorizeSelfOrAdmin } from '../middlewares/authorize.js';

const postRouter = express.Router();

postRouter.get('/', postController.getAllPosts);
postRouter.get('/:id', postController.getPostById);
postRouter.put('/:id', authenticateToken, authorizeSelfOrAdmin, postController.updatePost);
postRouter.post('/', authenticateToken, authorizeSelfOrAdmin, postController.createPost);
postRouter.delete('/:id', authenticateToken, authorizeSelfOrAdmin, postController.deletePost);

export default postRouter;
