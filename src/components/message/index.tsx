import React from "react";
import {ArgsProps, TYPE_COLOR_MAP} from "@components/message/type";
import {createRoot} from "react-dom/client";
import {Message} from "@components/message/message";
import './style.css'

const showMsg = (props: ArgsProps) => {
    const {
        type,
        duration = 3000,
    } = props

    const item = document.createElement('li')
    item.className = 'message-item-root'


    const dom = document.createElement('div')
    dom.className = 'message-item'
    dom.style.setProperty('--message-color', TYPE_COLOR_MAP[type])
    dom.style.setProperty('--message-duration', `${duration}ms`)


    // 动画完成时事件
    dom.addEventListener('animationend', (an) => {
        if (an.animationName === 'lineDisappear') {
            dom.style.animationName = 'hideToast'
            dom.style.animationTimingFunction = "cubic-bezier(0, 0, 0.2, 1)"
        } else if (an.animationName === 'hideToast') removeComponent()
    })


    item.appendChild(dom)
    message.container.appendChild(item)
    const msg = createRoot(dom)
    const removeComponent = () => {
        msg.unmount()
        message.container.removeChild(item)
        message.destroy()
    }

    msg.render(
        <Message {...props} onClick={() => {
            dom.style.animationName = 'hideToast'
        }}/>
    )
}

class message {
    private readonly ul: HTMLUListElement;
    private static instance: message | null = null

    static get container() {
        if (this.instance === null) {
            this.instance = new message()
        }
        return this.instance.ul
    }


    // 析构单例
    static destroy() {
        if (this.instance && this.instance.ul.children.length === 0) {
            document.body.removeChild(this.instance.ul)
            this.instance = null
        }
    }

    private constructor() {
        this.ul = document.createElement('ul')
        this.ul.className = 'message-container'
        document.body.appendChild(this.ul)
    }

    static info(
        content: string,
        duration?: number,
        onClose?: () => void,
    ) {
        showMsg({type: 'info', content, duration, onClose})
    }

    static success(
        content: string,
        duration?: number,
        onClose?: () => void,
    ) {
        showMsg({type: 'success', content, duration, onClose})
    }

    static warning(
        content: string,
        duration?: number,
        onClose?: () => void,
    ) {
        showMsg({type: 'warning', content, duration, onClose})
    }

    static error(
        content: string,
        duration?: number,
        onClose?: () => void,
    ) {
        showMsg({type: 'error', content, duration, onClose})
    }
}

export default message
