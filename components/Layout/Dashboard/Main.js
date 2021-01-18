import React from 'react'
import Nav from "./Nav";
export default function Main(props) {
    return (
        <main className="sm:h-full flex-1 flex flex-col min-h-0 min-w-0 overflow-auto">
            <Nav/>
            <section className="flex-1 pt-3 md:p-6 lg:mb-0 lg:min-h-0 lg:min-w-0">
                <div className="flex flex-col lg:flex-row h-full w-full">
                    {props.children && props.children}
                </div>
            </section>
            <footer className="px-6 py-3 border-t flex w-full items-end">
                <p className="text-gray-600">Made by @lperezdude</p>
                <div className="flex-1"></div>
            </footer>
        </main>)
}