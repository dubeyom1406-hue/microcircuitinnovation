import dbConnect from '../_utils/dbConnect';
import Vacancy from '../_models/Vacancy';
import { verifyToken } from '../_utils/auth';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const vacancies = await Vacancy.find({});
                res.status(200).json(vacancies);
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            if (!verifyToken(req)) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            try {
                const vacancy = await Vacancy.create(req.body);
                res.status(201).json(vacancy);
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
