// @ts-ignore
import {updateMealComponent} from '../../../utils/MealComponents';

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({msg: 'Method not allowed'});
    }

    const {id, name, ingredients} = req.body;

    try {
        const updated = await updateMealComponent(
            id, name, ingredients
        );
        return res.status(200).json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Something went wrong.'});
    }
}
