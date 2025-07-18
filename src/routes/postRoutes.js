import express from 'express';
import * as postController from '../controllers/postController.js';
import { authenticateToken } from '../middlewares/auth.js';
import { authorizeRoles, authorizeUserOrAdmin } from '../middlewares/authorize.js';
import { optionalAuth } from '../middlewares/optionalAuth.js';

const postRouter = express.Router();

postRouter.get('/', postController.getAllPublicPosts);

postRouter.get('/all', authenticateToken, authorizeRoles('AUTHOR', 'ADMIN'), postController.getAllPosts);

postRouter.get('/:id', optionalAuth, postController.getPostById);

postRouter.post('/', authenticateToken, authorizeRoles('AUTHOR', 'ADMIN'), postController.createPost);

postRouter.put('/:id', authenticateToken, authorizeUserOrAdmin(req => +req.params.id), postController.updatePost);
postRouter.delete('/:id', authenticateToken, authorizeUserOrAdmin(req => +req.params.id), postController.deletePost);

export default postRouter;
