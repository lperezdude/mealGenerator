import Head from 'next/head';
import Aside from "../Layout/Dashboard/Aside";
import MealComponentIcon from '../../icons/kitchen-white-18dp.svg'
import DashboardIcon from '../../icons/dashboard-white-18dp.svg'

import Main from "../Layout/Dashboard/Main";

export default function DashboardPageLayout(props) {
    const asideButtons = [
        {
            href: "/dashboard",
            icon: <DashboardIcon/>,
            largeIcon: true
        },
        {
            href: "/mealComponent",
            icon: <MealComponentIcon/>
        },
        {
            href: "/test",
            mainIcon: false
        }
    ]

    return (
        <div>
            <Head>
                <title>{props.title}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <body className="h-screen overflow-hidden flex items-center justify-center" style={{background: '#edf2f7'}}>
                <section
                    className="h-screen w-screen bg-gray-200 flex flex-col-reverse sm:flex-row min-h-0 min-w-0 overflow-hidden">
                    <Aside buttons={asideButtons}/>
                    <Main>{props.children}</Main>
                </section>
            </body>
        </div>
    )
}