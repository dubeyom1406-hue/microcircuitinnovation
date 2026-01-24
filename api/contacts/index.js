import dbConnect from '../_utils/dbConnect';
import Contact from '../_models/Contact';
import { verifyToken } from '../_utils/auth';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            if (!verifyToken(req)) return res.status(401).json({ success: false, message: 'Unauthorized' });
            try {
                const contacts = await Contact.find({});
                res.status(200).json(contacts);
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            // Public logic: Anyone can contact
            try {
                const contact = await Contact.create(req.body);
                res.status(201).json(contact);
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
