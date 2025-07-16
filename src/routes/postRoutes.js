import express from 'express';
import * as postController from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.get('/', postController.getAllPosts);
postRouter.get('/:id', postController.getPostById);
postRouter.put('/:id', postController.updatePost);
postRouter.post('/', postController.createPost);
postRouter.delete('/:id', postController.deletePost);

export default postRouter;
