import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/error.js';

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) return next(new UnauthorizedError('Token missing'));
    jwt.verify(token, process.env.JWT_SECRET || "secrepass", (err, user) => {
        if (err) return next(new UnauthorizedError('Invalid token'));
        req.user = user;
        next();
    });
}
