import dbConnect from '../_utils/dbConnect';
import Vacancy from '../_models/Vacancy';
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
                const vacancy = await Vacancy.findById(id);
                if (!vacancy) {
                    return res.status(404).json({ success: false });
                }
                res.status(200).json(vacancy);
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case 'PUT':
            if (!verifyToken(req)) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            try {
                const vacancy = await Vacancy.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!vacancy) {
                    return res.status(404).json({ success: false });
                }
                res.status(200).json(vacancy);
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case 'DELETE':
            if (!verifyToken(req)) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            try {
                const deletedVacancy = await Vacancy.deleteOne({ _id: id });
                if (!deletedVacancy) {
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
