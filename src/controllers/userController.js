import * as userService from '../services/userService.js';
import { BadRequestError } from '../utils/error.js';

export async function getUserById(req, res, next) {
    try {
        const id = +req.params.id;
        if (isNaN(id)) return next(new BadRequestError('Invalid user ID'));
        const user = await userService.getUserById(id);
        res.status(200).json({
            user: {
                name: user.name,
                role: user.role,
            }
        });

    } catch(err) {
        next(err);
    }
}

export function getMe(req, res, next) {
  const user = req.user;
  res.json({ id: user.id, name: user.name, role: user.role });
}

export async function createUser(req, res, next) {
    try {
        const { name, password, role } = req.body;
        const user = await userService
            .createUser({name, password, role: role.toUpperCase()});
        res.status(201).json({
            user: {
                name: user.name,
                role: user.role
            }
        });
    } catch(err) {
        next(err);
    }
}

export async function updateUser(req, res, next) {
    try {
        const id = +req.params.id;
        if (isNaN(id)) return next(new BadRequestError('Invalid user ID'));
        const { role } = req.body;
        if (!role) return next(new BadRequestError('Invalid body'));
        const user = await userService.updateUser({ id, role });
        res.status(200).json({
            user: {
                name: user.name,
                role: user.role
            }
        });
    } catch(err) {
        next(err);
    }
}

export async function deleteUser(req, res, next) {
    try {
        const id = +req.params.id;
        if (isNaN(id)) return next(new BadRequestError('Invalid user ID'));
        const user = await userService.deleteUser(id)
        res.status(200).json({
            user
        });
    } catch(err) {
        next(err);
    }
}
