import dbConnect from '../_utils/dbConnect';
import Contact from '../_models/Contact';
import { verifyToken } from '../_utils/auth';

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req;

    await dbConnect();

    switch (method) {
        case 'DELETE':
            if (!verifyToken(req)) return res.status(401).json({ success: false, message: 'Unauthorized' });
            try {
                const deletedContact = await Contact.deleteOne({ _id: id });
                if (!deletedContact) {
                    return res.status(404).json({ success: false });
                }
                res.status(200).json({ success: true });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}
