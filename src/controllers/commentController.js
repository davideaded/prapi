import * as commentService from '../services/commentService.js';
import { BadRequestError, ForbiddenError } from '../utils/error.js';

export async function getAllComments(req, res, next) {
    try {
        const comments = await commentService.getAllComments();
        res.status(200).json({
            message: `${comments.length} comments found`,
            comments,
        });
    } catch (err) {
        next(err);
    }
}

export async function getCommentById(req, res, next) {
    try {
        const id = +req.params.id;
        if (isNaN(id)) return next(new BadRequestError('Invalid comment ID'));
        const comment = await commentService.getCommentById(id);
        res.status(200).json({
            message: 'Comment found',
            comment,
        });
    } catch (err) {
        next(err);
    }
}

export async function createComment(req, res, next) {
    try {
        const { content, postId } = req.body;
        const authorId = req.user.id;
        if (!content || !postId) {
            return next(new BadRequestError('Missing required fields'));
        }
        const comment = await commentService.createComment({
            content,
            postId: +postId,
            authorId,
        });
        res.status(201).json({
            message: 'Comment created',
            comment,
        });
    } catch (err) {
        next(err);
    }
}

export async function updateComment(req, res, next) {
    try {
        const id = +req.params.id;
        const { content } = req.body;
        if (!content) return next(new BadRequestError('Content is required'));
        const comment = await commentService.getCommentById(id);
        if (!comment) return next(new BadRequestError('Comment not found'));
        if (comment.authorId !== req.user.id && req.user.role !== 'ADMIN') {
            return next(new ForbiddenError('You cannot edit this comment'));
        }
        const updated = await commentService.updateComment({ id, content });
        res.status(200).json({
            message: 'Comment updated',
            comment: updated,
        });
    } catch (err) {
        next(err);
    }
}

export async function deleteComment(req, res, next) {
    try {
        const id = +req.params.id;
        const comment = await commentService.getCommentById(id);
        if (!comment) return next(new BadRequestError('Comment not found'));
        if (comment.authorId !== req.user.id && req.user.role !== 'ADMIN') {
            return next(new ForbiddenError('You cannot delete this comment'));
        }
        const deleted = await commentService.deleteComment(id);
        res.status(200).json({
            message: 'Comment deleted',
            comment: deleted,
        });
    } catch (err) {
        next(err);
    }
}
