import dbConnect from '../_utils/dbConnect';
import CaseStudy from '../_models/CaseStudy';
import { verifyToken } from '../_utils/auth';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const caseStudies = await CaseStudy.find({});
                res.status(200).json(caseStudies);
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            if (!verifyToken(req)) return res.status(401).json({ success: false, message: 'Unauthorized' });
            try {
                const caseStudy = await CaseStudy.create(req.body);
                res.status(201).json(caseStudy);
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
