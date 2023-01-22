import EventEmitter from 'eventemitter3'
import {Aciton, ArgsProps} from "@components/message/type";

class Event {
    protected EE = new EventEmitter()

    messageEmit(providerId: string,
                action: Aciton,
                data: ArgsProps | number) {
        this.EE.emit(`message-${providerId}-${action}`, data)
    }

    messageSubscribe<T extends ArgsProps | number>(
        providerId: string, action: Aciton,
        callback: (item: T) => void) {
        this.EE.on(`message-${providerId}-${action}`, callback)
        return () => this.EE.off(`message-${providerId}-${action}`, callback)
    }
}

export const EE = new Event()
