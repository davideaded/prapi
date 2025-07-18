import jwt from 'jsonwebtoken';

export function optionalAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) return next();
    jwt.verify(token, process.env.JWT_SECRET || "secrepass", (err, user) => {
        if (!err) {
            req.user = user;
        }
        next();
    });
}
