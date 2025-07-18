import { ForbiddenError } from '../utils/error.js';

export function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !allowedRoles.includes(user.role)) {
            return next(new ForbiddenError('You do not have permission'));
        }
        next();
    };
}

export function authorizeUserOrAdmin(getTargetId) {
    return (req, res, next) => {
        const user = req.user;
        const targetId = getTargetId(req);
        if (isNaN(targetId)) {
            return next(new ForbiddenError('Invalid ID'));
        }
        const isSelf = user.id === targetId;
        const isAdmin = user.role === 'ADMIN';
        if (!isSelf && !isAdmin) {
            return next(new ForbiddenError('You do not have permission'));
        }
        next();
    };
}
