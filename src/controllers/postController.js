import * as postService from '../services/postService.js';
import { BadRequestError, ForbiddenError, UnauthorizedError } from '../utils/error.js';

export async function getAllPosts(req, res, next) {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json({
            posts
        });
    } catch(err) {
        next(err);
    }
}

export async function getAllPublicPosts(req, res, next) {
    try {
        const posts = await postService.getAllPublicPosts();
        res.status(200).json({
            posts
        });
    } catch(err) {
        next(err);
    }
}

export async function getPostById(req, res, next) {
    try {
        const user = req.user;
        const id = +req.params.id;
        if (isNaN(id)) return next(new BadRequestError('Invalid post ID'));
        const post = await postService.getPostById(id);
        if (!post.published) {
            if (!user) return next(new UnauthorizedError('Not authenticated'));
            if (user.role !== 'ADMIN' && user.role !== 'AUTHOR') {
                return next(new ForbiddenError('Not allowed'));
            }
        }
        res.status(200).json({
            post
        });
    } catch(err) {
        next(err);
    }
}
export async function createPost(req, res, next) {
    try {
        const { title, content, published } = req.body;
        const authorId = req.user.id;
        if (!title || title.trim() === '') {
            return next(new BadRequestError('Title is required'));
        }
        const post = await postService
            .createPost({title, content, authorId, published});
        res.status(201).json({
            post: {
                title: post.title,
                content: post.content,
                published: post.published
            }
        });
    } catch(err) {
        next(err);
    }
}

export async function updatePost(req, res, next) {
    try {
        const id = +req.params.id;
        if (isNaN(id)) return next(new BadRequestError('Invalid post ID'));
        const postData = req.body;
        if (!postData) return next(new BadRequestError('Invalid body'));
        const post = await postService.updatePost({id, postData});
        res.status(200).json({
            post: {
                title: post.title,
                content: post.content,
                published: post.published
            }
        });
    } catch(err) {
        next(err);
    }
}

export async function deletePost(req, res, next) {
    try {
        const id = +req.params.id;
        if (isNaN(id)) return next(new BadRequestError('Invalid post ID'));
        const post = await postService.deletePost(id)
        res.status(200).json({
            post
        });
    } catch(err) {
        next(err);
    }
}
