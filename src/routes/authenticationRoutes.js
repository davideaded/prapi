import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUserByName } from '../services/userService.js';
import { UnauthorizedError } from '../utils/error.js';

const authenticationRouter = express.Router();

authenticationRouter.post('/', async (req, res, next) => {
    try {
        const { name, password } = req.body;
        const user = await getUserByName(name);
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return next(new UnauthorizedError('Wrong credentials'));
        const payload = {
            id: user.id,
            name: user.name,
            role: user.role
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET || "secrepass", {
            expiresIn: '1h'
        });
        res.json({ token });
    } catch (err) {
        next(err);
    }
});

export default authenticationRouter;
