import { PrismaClient } from '@prisma/client';
import { BadRequestError, NotFoundError } from '../utils/error.js';

const prisma = new PrismaClient();

export async function getAllComments() {
    const comments = await prisma.comment.findMany({
        include: {
            author: {
                select: { name: true }
            },
            Post: {
                select: { title: true }
            }
        }
    });
    return comments;
}

export async function getCommentById(id) {
    const comment = await prisma.comment.findUnique({
        where: { id },
        include: {
            author: { select: { name: true } },
            Post: { select: { title: true } }
        }
    });
    if (!comment) throw new NotFoundError('Comment not found');
    return comment;
}

export async function createComment({ content, postId, authorId }) {
    if (!content) throw new BadRequestError('Content is required');
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundError('Post not found');
    return await prisma.comment.create({
        data: {
            content,
            postId,
            authorId
        }
    });
}

export async function updateComment({ id, content }) {
    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundError('Comment not found');
    return await prisma.comment.update({
        where: { id },
        data: { content }
    });
}

export async function deleteComment(id) {
    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundError('Comment not found');
    return await prisma.comment.delete({
        where: { id },
        select: { content: true }
    });
}
