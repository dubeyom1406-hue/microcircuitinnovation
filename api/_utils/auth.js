import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_please_change';

export const verifyToken = (req) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return null;
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
};
