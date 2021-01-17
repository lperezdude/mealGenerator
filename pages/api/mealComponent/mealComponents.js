import { getMealComponents } from '../../../utils/MealComponents';
export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405);
    }
    try {
        const mealComponent = await getMealComponents();
        return res.status(200).json(mealComponent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Something went wrong.' });
    }
}
