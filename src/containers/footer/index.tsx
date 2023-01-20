import React from "react";
import './style.css'
import {Icon} from '@iconify/react';
import arrowBar from '@iconify/icons-mdi/arrow-collapse-left';
import {totalAtom} from "@stores/jotai";
import {useAtomValue} from "jotai";
import {useI18n} from "@lib/hook";

interface FooterProps {
    drawerVisible: boolean
    toggleDrawerVisible: () => void
}

const TotalCount = () => {
    const total = useAtomValue(totalAtom)
    const {translation} = useI18n()
    return <div
        font='antialiased'
        text='sm'
        select='none'
    >{`${total} ${translation('footer.totalCount')}`}
    </div>
}

export default function Footer(props: FooterProps) {

    const {drawerVisible, toggleDrawerVisible} = props

    return (
        <div className='footer'>
            <button
                onClick={toggleDrawerVisible}
                className='footer-bottom'
            >
                <Icon icon={arrowBar} width="16" height="24" hFlip={!drawerVisible}/>
            </button>
            <div flex='1'/>
            <TotalCount/>
        </div>)
}
