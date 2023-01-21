import {noop} from "@lib/helper";

import {MessageProvider} from "@components/message/provider";
import {ArgsProps, NoticeType} from "@components/message/type";
import {EE} from "@lib/event";
import dayjs from "dayjs";

export namespace Message {

    function show(
        providerId: string,
        content: string,
        type: NoticeType,
        duration: number,
        onClose: () => void
    ) {
        const args = {
            id: dayjs().valueOf(),
            content,
            type,
            duration,
            onClose
        } satisfies ArgsProps;
        EE.emit<ArgsProps>(`message-${providerId}-addItem`, args)
        return {
            'remove': () => EE.emit(`message-${providerId}-removeItem`, args.id),
            'update': (
                content: string = args.content,
                type: NoticeType = args.type,
                duration: number = args.duration!,
                onClose: () => void = args.onClose!
            ) => EE.emit<ArgsProps>
            (`message-${providerId}-updateItem`,
                {
                    id: args.id,
                    'content': content,
                    'type': type,
                    'duration': duration,
                    'onClose': onClose
                }
            )
        }
    }

    export function Info(
        providerId: string,
        content: string,
        duration: number = 3000,
        onClose: () => void = noop
    ) {
        return show(providerId, content, 'info', duration, onClose)
    }

    export function Success(
        providerId: string,
        content: string,
        duration: number = 3000,
        onClose: () => void = noop
    ) {
        return show(providerId, content, 'success', duration, onClose)
    }

    export function Warning(
        providerId: string,
        content: string,
        duration: number = 3000,
        onClose: () => void = noop
    ) {
        return show(providerId, content, 'warning', duration, onClose)
    }

    export function Error(
        providerId: string,
        content: string,
        duration: number = 3000,
        onClose: () => void = noop
    ) {
        return show(providerId, content, 'error', duration, onClose)
    }

    export function Loading(
        providerId: string,
        content: string,
        onClose: () => void = noop
    ) {
        const {
            remove,
            update
        } = show(providerId, content, 'loading', NaN, onClose)
        return {
            'remove': remove,
            'resolve': (
                content: string,
                onClose: () => void = noop
            ) => update(content, 'success', 3000, onClose),
            'reject': (
                content: string,
                onClose: () => void = noop
            ) => update(content, 'error', 3000, onClose)
        }
    }
}

export {
    MessageProvider
} from './provider';
