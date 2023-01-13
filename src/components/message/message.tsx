import "./style.css"
import {Icon} from "@iconify/react";
import informationIcon from '@iconify/icons-mdi/information';
import checkCircle from '@iconify/icons-mdi/check-circle';
import alertIcon from '@iconify/icons-mdi/alert';
import closeCircle from '@iconify/icons-mdi/close-circle';
import closeThick from '@iconify/icons-mdi/close-thick';
import {MessageProps, TYPE_COLOR_MAP} from "@components/message/type";
import {useEffect} from "react";
import {noop} from "@lib/helper";

// 消息类型对应的图标
const TYPE_ICON_MAP = {
    info: <Icon
        icon={informationIcon}
        width="22"
        height="22"
        color={TYPE_COLOR_MAP.info}
    />,
    success: <Icon
        icon={checkCircle}
        width="22"
        height="22"
        color={TYPE_COLOR_MAP.success}
    />,
    warning: <Icon
        icon={alertIcon}
        width="22"
        height="22"
        color={TYPE_COLOR_MAP.warning}
    />,
    error: <Icon
        icon={closeCircle}
        width="22"
        height="22"
        color={TYPE_COLOR_MAP.error}
    />,
}

export function Message(props: MessageProps) {
    const {
        content,
        type,
        onClick,
        onClose = noop
    } = props

    useEffect(() => {
        return onClose
    }, [])

    return <>
        {TYPE_ICON_MAP[type]}
        <span
            flex='1'
            m='l-2 r-4'
            text='sm'
            font='antialiased medium'
        >{content}</span>
        <Icon
            className="message-close"
            icon={closeThick}
            onClick={onClick}
        />
    </>
}
