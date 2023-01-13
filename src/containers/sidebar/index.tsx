import React, {useState} from "react";
import './style.css'
import Tabs from "@components/tabs";
import {Filter, Search} from "./components";
import {useI18n} from "@lib/hook";

export default function Sidebar() {
    const [tabIndex, setTabIndex] = useState(0)
    const {translation} = useI18n()

    return (
        <>
            <Tabs index={tabIndex}
                  tabsTitle={translation('sideBar.tabsTitle')}
                  setIndex={setTabIndex}
            />
            {tabIndex === 0 && <Search/>}
            {tabIndex === 1 && <Filter/>}
        </>)
}
