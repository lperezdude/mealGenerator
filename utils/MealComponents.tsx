// @ts-ignore
const faunadb = require('faunadb');
const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
const q = faunadb.query;

const getMealComponents = async () => {
    const { data } = await faunaClient.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection('mealComponents'))),
            q.Lambda('ref', q.Get(q.Var('ref')))
        )
    );
    return  data.map((mealComponent) => {
        mealComponent.id = mealComponent.ref.id;
        delete mealComponent.ref;
        return mealComponent;
    });
};

const getMealComponentById = async (id) => {
    const mealComponent = await faunaClient.query(
        q.Get(q.Ref(q.Collection('mealComponents'), id))
    );
    mealComponent.id = mealComponent.ref.id;
    delete mealComponent.ref;
    return mealComponent;
};

const createMealComponent = async (name, type, ingredients) => {
    return await faunaClient.query(
        q.Create(q.Collection('mealComponents'), {
            data: { name, type, ingredients },
        })
    );
};

const updateMealComponent = async (id, name, type, ingredients) => {
    return await faunaClient.query(
        q.Update(q.Ref(q.Collection('mealComponents'), id), {
            data: { name, type, ingredients },
        })
    );
};

const deleteMealComponent = async (id) => {
    return await faunaClient.query(
        q.Delete(q.Ref(q.Collection('mealComponents'), id))
    );
};

module.exports = {
    getMealComponents,
    getMealComponentById,
    createMealComponent,
    updateMealComponent,
    deleteMealComponent,
};
