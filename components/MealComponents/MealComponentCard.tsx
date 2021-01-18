import React from 'react'
import DeleteIcon from '../../icons/remove_circle_outline-black-18dp.svg'
export default function MealComponentCard({mealComponent, deletedCallBack,toggle}) {
    const deleteMealComponent = async () => {
        try {
            await fetch('/api/mealComponent/deleteMealComponent', {
                method: "DELETE",
                body: JSON.stringify({id: mealComponent.id}),
                headers: {'Content-Type': 'application/json'}
            });
            deletedCallBack()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="p-5 bg-gray-50 transition-shadow border rounded-lg mt-4 shadow-sm hover:shadow-lg" onClick={toggle}>
            <div className="flex items-start w-full justify-between">
                <div className="flex justify-between w-full  space-y-2">
                    <span className={"text-xl"}>Name: {mealComponent.data.name}</span>
                    <DeleteIcon onClick={()=>{deleteMealComponent()}} className={"cursor-pointer"}/>
                </div>
            </div>
            {mealComponent.data.ingredients && mealComponent.data.ingredients.map((ingredient) => {
                return (
                    <div key={ingredient.name}
                         className="flex content-center leading-loose justify-between bg-gray-200 mt-2 rounded ">
                        <span className={"px-2"} key={ingredient.name}>{ingredient.name}</span>
                        <span className={"text-sm text-white bg-gray-700 px-2 rounded m-2 "}>{ingredient.type}</span>
                    </div>)
            })}
        </div>
    )
}