import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
// @ts-ignore
import PlusIcon from '../../icons/add_circle_outline-black-18dp.svg'
// @ts-ignore
import DeleteIcon from '../../icons/delete-black-18dp.svg'
import { useRouter } from 'next/router'



export default function MealComponentForm({ mealComponent, listReFetch }) {
    const router = useRouter()
    const { register, handleSubmit, errors, setValue, control } = useForm({
        defaultValues: {
            name: mealComponent ? mealComponent.data.name : '',
            ingredients: mealComponent ? mealComponent.data.ingredients : [],
        },
    });
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "ingredients", // unique name for your Field Array
        // keyName: "id", default to "id", you can change the key name
    });
    useEffect(() => {
        console.log('Updating ingredietns')
        if (mealComponent !== undefined) {
            setValue("name", mealComponent.data.name)
            setValue("ingredients", mealComponent.data.ingredients)
        } else {
            setValue("name", '')
            setValue("ingredients", [])
        }
    }, [mealComponent])

    const addNewIngredient = () => {
        append({ name: '', type: '' })
    }

    const createMealComponent = async (data) => {
        const { name, ingredients } = data;
        try {
            await fetch('/api/mealComponent/createMealComponent', {
                method: 'POST',
                body: JSON.stringify({ name, ingredients }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            router.push('/mealComponent');
            listReFetch()
        } catch (err) {
            console.error(err);
        }
    };

    const updateMealComponent = async (data) => {
        const { name, ingredients } = data;
        const id = mealComponent.id;
        try {
            await fetch('/api/mealComponent/updateMealComponent', {
                method: 'PUT',
                body: JSON.stringify({ name, ingredients, id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            router.push('/mealComponent');
            listReFetch()
        } catch (err) {
            console.error(err);
        }
    };

    const formSubmit = async (data) => {
        if (mealComponent === undefined) {
            handleSubmit(() => createMealComponent(data))
        } else {
            handleSubmit(() => updateMealComponent(data))
        }
        // trigger refetch 
    }

    return (
        <form className={"p-5 bg-gray-50 transition-shadow border rounded-lg mt-4 shadow-sm "}
            onSubmit={handleSubmit(mealComponent ? updateMealComponent : createMealComponent)}>
            <div className="mb-4 ">
                <label
                    className="block text-100 text-sm font-bold mb-1"
                    htmlFor="name">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700"
                    placeholder={"New Meal Component"}
                    ref={register({ required: true })}
                />
                {errors.name && (
                    <p className="font-bold text-900">Name is required</p>
                )}
            </div>
            <div className="mb-4">
                <label
                    className="block text-100 text-sm font-bold mb-1"
                    htmlFor="ingredients"
                >
                    Ingredients
                </label>
                {fields.map((field, index) => (
                    <div key={field.id} className={"flex justify-between space-x-4"}>
                        <input
                            className="w-6/12 border bg-white rounded px-3 py-2 outline-none text-gray-700 mt-2"
                            key={"name" + field.id} // important to include key with field's id
                            name={`ingredients[${index}].name`}
                            ref={register({ required: true })} // register() when there is no validation rules
                            defaultValue={field.name} // make sure to include defaultValue
                        />
                        <input
                            className="w-6/12 border bg-white rounded px-3 py-2 outline-none text-gray-700 mt-2"
                            key={"type" + field.id} // important to include key with field's id
                            name={`ingredients[${index}].type`}
                            ref={register({ required: true })} // register() when there is no validation rules
                            defaultValue={field.type} // make sure to include defaultValue
                        />
                        <DeleteIcon onClick={() => { remove(index) }} className={"size mt-4 mr-4"} style={{ width: '25px', height: '25px', cursor: 'pointer' }} />
                    </div>
                ))}
                {errors.ingredients && (
                    <p className="font-bold text-900">
                        Ingredietns are Required
                    </p>
                )}
            </div>
            <div className={"flex justify-center"} onClick={addNewIngredient}>
                <PlusIcon className={"size"} style={{ width: '25px', height: '25px', cursor: 'pointer' }} />
            </div>
            <button
                className="bg-green-500 text-white transition duration-300 ease-in-out  hover:bg-green-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                type="submit"
            >
                {mealComponent?"Update":"Create"}
            </button>
        </form>
    )
}