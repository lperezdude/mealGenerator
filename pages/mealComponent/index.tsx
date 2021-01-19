import React, { useState } from 'react'
import MealComponentCard from '../../components/MealComponents/MealComponentCard'
import DashboardPageLayout from "../../components/AppLayout/DashboardPageLayout";
import MealComponentForm from "../../components/MealComponents/MealComponentForm";
import useSWR from 'swr';

export default function Home() {
    const { data: mealComponents, mutate } = useSWR('/api/mealComponent/mealComponents');
    const [currentMealComponent, setCurrentMealComponent] = useState(undefined);


    return (
        <DashboardPageLayout title={"Meal Components"}>
            <main className="sm:h-full flex-1 flex flex-col min-h-0 min-w-0 overflow-auto grid grid-cols-2 gap-5 ">
                <div>
                    <div>
                        <h1 className="text-100 text-2xl">
                            Meal Components
                        </h1>
                        <p className="text-200">
                            Create and browse snippets you use every day in Web
                            Development!
                        </p>
                    </div>
                    <div
                        className={"cursor-pointer bg-blue-500 rounded-lg font-bold text-white px-4 py-5 text-center transition duration-300 ease-in-out hover:bg-blue-600"}
                        onClick={() => { setCurrentMealComponent(undefined) }}>
                        Create New Meal Component
                    </div>
                    {mealComponents && mealComponents.map((mealComponent) => (
                        <MealComponentCard
                            key={mealComponent.id}
                            mealComponent={mealComponent}
                            deletedCallBack={() => {
                                setCurrentMealComponent(undefined)
                                mutate()
                            }}
                            toggle={() => {
                                setCurrentMealComponent(mealComponent)
                            }}
                        />))}
                </div>
                <div className={"border h-full w-full lg:flex-1 px-3 min-h-0 min-w-0"}>
                    <MealComponentForm mealComponent={currentMealComponent} />
                </div>
            </main>
        </DashboardPageLayout>
    );
}