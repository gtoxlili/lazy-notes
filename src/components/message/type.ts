type NoticeType = 'success' | 'info' | 'warning' | 'error'

export interface ArgsProps {
    content: string
    type: NoticeType
    duration?: number
    onClose?: () => void
}

export const TYPE_COLOR_MAP = {
    info: '#3498db',
    success: '#0abf30',
    warning: '#e9bd0c',
    error: '#e24d4c',
}


export type MessageProps = Omit<ArgsProps, 'duration'> & { onClick: () => void }
