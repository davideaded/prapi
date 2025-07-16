import { ForbiddenError } from '../utils/error.js';

export function authorizeSelfOrAdmin(req, res, next) {
    const loggedUser = req.user;
    const targetId = +req.params.id;
    if (isNaN(targetId)) {
        return next(new ForbiddenError('Invalid target ID'));
    }
    const isSelf = loggedUser.id === targetId;
    const isAdmin = loggedUser.role === 'ADMIN';
    if (!isSelf && !isAdmin) {
        return next(new ForbiddenError('You do not have permission'));
    }
    next();
}
