import {createMealComponent} from '../../../utils/MealComponents'

export default async function handler(req, res) {
    const {name,ingredients} = req.body;
    if (req.method !== 'POST') {
        return res.status(405).json({msg: 'Method not allowed'});
    }
    try {
        const createdSnippet = await createMealComponent(
            name,ingredients
        );
        return res.status(200).json(createdSnippet);
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Something went wrong.'});
    }
}
