import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { BadRequestError, ConflictError, NotFoundError } from '../utils/error.js';

const prisma = new PrismaClient({});

export async function getUserById(id) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundError('User not found');
    return user;
}

export async function createUser(userData) {
    const { name, password, role = 'USER' } = userData;
    const validRoles = ['USER', 'ADMIN', 'AUTHOR'];
    if (!validRoles.includes(role)) {
        throw new BadRequestError('Invalid user role');
    }
    const existing = await prisma.user.findUnique({ where: { name } });
    if (existing) {
        throw new ConflictError('User name already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
        data: {
            name,
            password: hashedPassword,
            role: role.toUpperCase(),
        }
    });
}

export async function updateUser({id, role}) {
    role = role.toUpperCase();
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError('User not found');
    const validRoles = ['USER', 'ADMIN', 'AUTHOR'];
    if (!validRoles.includes(role)) {
        throw new BadRequestError('Invalid user role');
    }
    return await prisma.user.update({
        where: { id }, 
        data: { role }
    });
}

export async function deleteUser(id) {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError('User not found');
    return await prisma.user.delete({
        where: { id: id },
        select: {
            name: true,
            role: true,
        },
    });
}
