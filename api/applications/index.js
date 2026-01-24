import dbConnect from '../_utils/dbConnect';
import Application from '../_models/Application';
import { verifyToken } from '../_utils/auth';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            if (!verifyToken(req)) return res.status(401).json({ success: false, message: 'Unauthorized' });
            try {
                const applications = await Application.find({});
                res.status(200).json(applications);
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            // Public logic: Anyone can apply
            try {
                const application = await Application.create(req.body);
                res.status(201).json(application);
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
