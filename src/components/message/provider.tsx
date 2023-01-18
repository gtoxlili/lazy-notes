import {MessageProviderProps} from "@components/message/type";
import {useRefDom} from "@lib/hook";
import React, {CSSProperties, useLayoutEffect, useMemo} from "react";
import {createPortal} from "react-dom";
import {MessageContainer} from "@components/message/message";

export const MessageProvider = (
    props: MessageProviderProps
) => {

    const {direction = 'TR'} = props
    const messageProvider = useRefDom('div')

    const containerStyle = useMemo(() => {
        const style: CSSProperties = {}
        direction.includes('T') ? (style.top = '20px') : (style.bottom = '20px')
        direction.includes('L') ? (style.left = '20px') : (style.right = '20px')
        return style
    }, [direction])

    useLayoutEffect(() => {
        document.body.appendChild(messageProvider)
        return () => {
            document.body.removeChild(messageProvider)
        }
    }, [])

    return createPortal(
        <ul
            pos='fixed'
            style={containerStyle}
        ><MessageContainer {...props}/>
        </ul>, messageProvider
    )
}
