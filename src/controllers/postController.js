import * as postService from '../services/postService.js';
import { BadRequestError } from '../utils/error.js';

export async function getAllPosts(req, res, next) {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json({
            message: `${posts.length} fetched`,
            posts
        });
    } catch(err) {
        next(err);
    }
}

export async function getPostById(req, res, next) {
    try {
        const id = +req.params.id;
        if (isNaN(id)) return next(new BadRequestError('Invalid post ID'));
        const post = await postService.getPostById(id);
        res.status(200).json({
            message: 'Post found',
            post
        });
    } catch(err) {
        next(err);
    }
}

export async function createPost(req, res, next) {
    try {
        const { title, content } = req.body;
        if (!title || title.trim() === '') {
            return next(new BadRequestError('Title is required'));
        }
        const post = await postService
            .createPost({title, content});
        res.status(201).json({
            message: 'Post created',
            post: {
                title: post.title,
                content: post.content
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
            message: 'Post edited',
            post: {
                title: post.title,
                content: post.content
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
            message: 'Post deleted',
            post
        });
    } catch(err) {
        next(err);
    }
}
