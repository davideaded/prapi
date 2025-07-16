import * as userService from '../services/userService.js';

export async function createUser(req, res, next) {
    try {
        console.log(req.body);
        const user = await userService.createUser(req.body);
        res.status(201).json({
            message: 'User created',
            user: {
                name: user.name,
                role: user.role
            }
        });
    } catch (err) {
        next(err);
    }
}
