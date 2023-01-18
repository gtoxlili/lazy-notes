export type NoticeType = 'success' | 'info' | 'warning' | 'error' | 'loading'

export interface MessageProviderProps {
    providerId: string
    direction?: 'TR' | 'TL' | 'BR' | 'BL'
    /**
     * 最多显示多少条消息
     */
    maxCount?: number
}

export type MessageContainerProps = Omit<MessageProviderProps, 'direction'>

export interface ArgsProps {
    id: number
    content: string
    type: NoticeType
    duration: number
    onClose: () => void
}

export const TYPE_COLOR_MAP = {
    info: '#3498db',
    success: '#0abf30',
    warning: '#e9bd0c',
    error: '#e24d4c',
    loading: '#15aabf'
}

export type MessageItemProps = ArgsProps &
    {
        onClick: () => void,
    }
