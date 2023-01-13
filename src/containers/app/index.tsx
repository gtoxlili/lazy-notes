import {Outlet} from "react-router-dom";
import React from "react";
import classnames from "classnames";
import './style.css'
import Footer from "@containers/footer";
import Drawer from "@components/drawer";
import Sidebar from "@containers/sidebar";
import {useVisible} from "@lib/hook";

export default function App() {
    const {visible, toggle} = useVisible()
    return (
        <>
            <Drawer visible={visible}><Sidebar/></Drawer>
            <div className={
                classnames(
                    'content',
                    {'sidebar-drawer-expanded': visible},
                    {'sidebar-drawer-collapsed': !visible})
            }>
                <div className='content-container'>
                    <Outlet/>
                </div>
                <Footer toggleDrawerVisible={toggle} drawerVisible={visible}/>
            </div>
        </>)
}
