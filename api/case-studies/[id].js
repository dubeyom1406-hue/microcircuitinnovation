import dbConnect from '../_utils/dbConnect';
import CaseStudy from '../_models/CaseStudy';
import { verifyToken } from '../_utils/auth';

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const caseStudy = await CaseStudy.findById(id);
                if (!caseStudy) {
                    return res.status(404).json({ success: false });
                }
                res.status(200).json(caseStudy);
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case 'PUT':
            if (!verifyToken(req)) return res.status(401).json({ success: false, message: 'Unauthorized' });
            try {
                const caseStudy = await CaseStudy.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!caseStudy) {
                    return res.status(404).json({ success: false });
                }
                res.status(200).json(caseStudy);
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case 'DELETE':
            if (!verifyToken(req)) return res.status(401).json({ success: false, message: 'Unauthorized' });
            try {
                const deletedStudy = await CaseStudy.deleteOne({ _id: id });
                if (!deletedStudy) {
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
