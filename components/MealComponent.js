import React from 'react'

export default function MealComponent({mealComponent,deletedCallBack}){
    const deleteMealComponent = async () => {
        try{
            await fetch('/api/mealComponent/deleteMealComponent',{
                method:"DELETE",
                body: JSON.stringify({id:mealComponent.id}),
                headers:{'Content-Type':'application/json'}
            });
            deletedCallBack()
        }catch (error){
            console.log(error)
        }
    }
    return (<div></div>)
}