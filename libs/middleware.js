import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return next({ status: 401, message: 'Unauthorizes' });

    jwt.verify(token, process.env.AUTH_SECRET, (err, user) => {
        if (err) return next({ status: 403, message: 'Forbidden' });
        req.user = user;
        next();
    });
};

export const errorHandler = (err, req, res, next) => {
    const defaultMessage = "We're having technical issues. Please try agian later.";
    const { status, message, error } = err;
    if (error) {
        console.log(error);
    }
    res.status(status).json({ message: message || defaultMessage });
};