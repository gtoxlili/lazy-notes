import React, {lazy, Suspense, useState} from "react";
import './style.css'
import Tabs from "@components/tabs";
import {useI18n} from "@lib/hook";

const Filter = lazy(() => import('./components/filter'))
const Search = lazy(() => import('./components/search'))

export default function Sidebar() {
    console.log('render sidebar')
    const [tabIndex, setTabIndex] = useState(0)
    const {translation} = useI18n()

    return (
        <>
            <Tabs index={tabIndex}
                  tabsTitle={translation('sideBar.tabsTitle')}
                  setIndex={setTabIndex}
            />
            <Suspense>
                {tabIndex === 0 && <Search/>}
                {tabIndex === 1 && <Filter/>}
            </Suspense>
        </>)
}

