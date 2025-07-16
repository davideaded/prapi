import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { BadRequestError, ConflictError } from '../utils/error.js';

const prisma = new PrismaClient({});

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
            role,
        }
    });
}
