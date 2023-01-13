import React, {ReactNode, useLayoutEffect} from "react";
import './style.css'
import classnames from 'classnames'
import {createPortal} from "react-dom";
import {useRefDom, useVisible} from "@lib/hook";

interface SidebarProps {
    visible: boolean
    hide?: () => void
    children?: ReactNode
    useMask?: boolean
}

const Drawer = (props: SidebarProps) => {

    const sideBarRoot = useRefDom("div")
    const {visible, hide, children, useMask} = props
    const {visible: childrenVisible, hide: hideChildren, show: showChildren} = useVisible()
    useLayoutEffect(() => {
        if (visible) {
            document.body.appendChild(sideBarRoot)
            showChildren()
        }
    }, [visible])

    const drawer = (
        <>
            {
                useMask && <div className={classnames(
                    'mask',
                    {'mask-show': visible},
                    {'mask-hide': !visible}
                )} onClick={hide}>
                </div>
            }
            <div className={classnames(
                'drawer',
                {'drawer-show': visible},
                {'drawer-hide': !visible}
            )} onAnimationEnd={() => {
                if (!visible) {
                    document.body.removeChild(sideBarRoot)
                    hideChildren()
                }
            }}>
                {childrenVisible && children}
            </div>
        </>

    )

    return createPortal(drawer, sideBarRoot)
}

export default Drawer
