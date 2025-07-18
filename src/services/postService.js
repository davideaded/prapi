import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../utils/error.js';

const prisma = new PrismaClient({});

export async function getAllPosts() {
    const posts = await prisma.post.findMany({
        include: {
            author: {
                select: {
                    name: true
                }
            }
        }
    });
    return posts;
}

export async function getAllPublicPosts() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        }
    });
    return posts;
}

export async function getPostById(id) {
    const post = await prisma.post.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        }
    });
    if (!post) throw new NotFoundError('Post not found');
    return post;
}

export async function createPost(postData) {
    const { title, content, authorId, published } = postData;
    return await prisma.post.create({
        data: {
            title,
            content,
            authorId,
            published
        }
    });
}

export async function updatePost({id, postData}) {
    const existing = await prisma.post.findUnique({ where: { id } });
    const { title, content, published } = postData;
    if (!existing) throw new NotFoundError('Post not found');
    return await prisma.post.update({
        where: { id }, 
        data: {
            title,
            content,
            published
        }
    });
}

export async function deletePost(id) {
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError('Post not found');
    return await prisma.post.delete({
        where: { id: id },
        select: {
            title: true,
            content: true,
        },
    });
}
