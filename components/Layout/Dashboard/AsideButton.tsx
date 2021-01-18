import React from 'react'
import DefaultIcon from '../../../icons/insert_emoticon-white-18dp.svg'
export default function AsideButton({button}) {
    return (
        <li className={"sm:border-b border-gray-900 flex-1 sm:w-full hover:bg-gray-700"}>
            <a id="page-icon" href={button.href} className="block p-3 inline-flex items-center">
                {button.icon!== undefined ? button.icon : <DefaultIcon/> }
            </a>
        </li>
    )
}