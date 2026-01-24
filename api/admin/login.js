import dbConnect from '../_utils/dbConnect';
import Admin from '../_models/Admin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_please_change';

export default async function handler(req, res) {
    // Ensure database is connected
    await dbConnect();

    if (req.method === 'POST') {
        try {
            const { username, password } = req.body;

            // Basic validation
            if (!username || !password) {
                return res.status(400).json({ success: false, message: 'Username and password are required' });
            }

            // Find admin by username
            const admin = await Admin.findOne({ username });
            if (!admin) {
                return res.status(400).json({ success: false, message: 'Invalid credentials' });
            }

            // Check password
            // Note: This expects the password in the database to be hashed.
            // If you manually inserted a plain text password, this will fail.
            const isMatch = await bcrypt.compare(password, admin.password);

            if (!isMatch) {
                return res.status(400).json({ success: false, message: 'Invalid credentials' });
            }

            // Generate Token
            const token = jwt.sign(
                { id: admin._id, username: admin.username },
                JWT_SECRET,
                { expiresIn: '1d' }
            );

            res.status(200).json({ success: true, token });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ success: false, message: 'Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
    }
}
