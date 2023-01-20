import EventEmitter from 'eventemitter3'

class Event {
    protected EE = new EventEmitter()

    emit<T>(event: string, data: T) {
        this.EE.emit(event, data)
    }

    subscribe<T>(event: string, callback: (data: T) => void) {
        this.EE.addListener(event, callback)
    }

    unsubscribe<T>(event: string, callback: (data: T) => void) {
        this.EE.removeListener(event, callback)
    }
}

export const EE = new Event()
