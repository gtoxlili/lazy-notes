import "./style.css"
import {Icon} from "@iconify/react";
import informationIcon from '@iconify/icons-mdi/information';
import checkCircle from '@iconify/icons-mdi/check-circle';
import alertIcon from '@iconify/icons-mdi/alert';
import closeCircle from '@iconify/icons-mdi/close-circle';
import closeThick from '@iconify/icons-mdi/close-thick';
import {ArgsProps, MessageContainerProps, MessageItemProps, TYPE_COLOR_MAP} from "@components/message/type";
import React, {memo, useCallback, useEffect, useLayoutEffect, useMemo, useState} from "react";
import {useImmer} from "use-immer";
import EE from '@lib/event'
import classnames from "classnames";

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
    loading: <
        svg
        className="animate-spin" xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24" width="22" height="22" color={TYPE_COLOR_MAP.loading}
    >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
    </svg>
}

export const MessageContainer = (props: MessageContainerProps) => {
    const {
        providerId,
        maxCount = 5,
    } = props

    const [messageList, setMessageList] = useImmer<MessageItemProps[]>([])

    const removeItem = useCallback(
        (id: number) => {
            setMessageList(draft => {
                const index = draft.findIndex(item => item.id === id)
                if (index > -1) {
                    draft.splice(index, 1)
                }
            })
        }, [setMessageList]
    )

    useLayoutEffect(
        () => {
            const addItem = (item: ArgsProps) =>
                setMessageList(draft => {
                    draft.push({
                        ...item,
                        onClick: () => removeItem(item.id),
                    })
                })
            const updateItem = (item: ArgsProps) =>
                setMessageList(draft => {
                    const index = draft.findIndex(i => i.id === item.id)
                    if (index > -1) {
                        draft[index] = {
                            ...item,
                            onClick: draft[index].onClick,
                        }
                    }
                })
            EE.subscribe(`message-${providerId}-addItem`, addItem)
            EE.subscribe(`message-${providerId}-removeItem`, removeItem)
            EE.subscribe(`message-${providerId}-updateItem`, updateItem)
            return () => {
                EE.unsubscribe(`message-${providerId}-addItem`, addItem)
                EE.unsubscribe(`message-${providerId}-removeItem`, removeItem)
                EE.unsubscribe(`message-${providerId}-updateItem`, updateItem)
            }
        }
        , [])

    return <>
        {
            messageList
                .slice(0, maxCount)
                .map((props) => <MessageItem key={props.id} {...props} />)
        }
    </>

}

const MessageItem = memo((props: MessageItemProps) => {
    const {
        content,
        type,
        duration,
        onClick,
        onClose,
    } = props

    const customProps = useMemo(() => {
        return {
            "--message-color": TYPE_COLOR_MAP[type],
            "--message-duration": `${duration}ms`,
        }
    }, [type, duration])

    const [animation, setAnimation] = useState("show-toast")

    useEffect(() => {
        return onClose
    }, [])

    return <li
        className="message-item-root"
    >
        <div
            className={classnames("message-item", animation, {"progress-rate": type !== 'loading'})}
            style={customProps}
            onAnimationEnd={(an) => {
                if (an.animationName === "lineDisappear") {
                    setAnimation("hide-toast")
                } else if (an.animationName === "hideToast") onClick()
            }}
        >
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
        </div>
    </li>
})
