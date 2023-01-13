import {CSSProperties, ReactNode, useCallback, useLayoutEffect, useRef} from "react";
import {noop} from "@lib/helper";
import './style.css'
import {useImmer} from "use-immer";

interface ToolTipProps {
    children: ReactNode
    title: string
    placement?: 'top' | 'bottom' | 'left' | 'right'
    trigger?: 'hover' | 'click'
    onOpenChange?: (open: boolean) => void
    backgroundColor?: string
    textColor?: string
    /**
     * 悬停延迟 单位 : 秒
     */
    hoverDelay?: number
    /**
     * 离开延迟 单位 : 秒
     */
    leaveDelay?: number
}

const Tooltip = (props: ToolTipProps) => {
    const {
        children,
        title,
        placement = 'bottom',
        trigger = 'hover',
        onOpenChange = noop,
        backgroundColor = '#000',
        textColor = '#fff',
        hoverDelay = 0.2,
        leaveDelay = 0.2,
    } = props
    const [tooltipStyle, setTooltipStyle] = useImmer<CSSProperties>({opacity: 0} as CSSProperties)

    useLayoutEffect(() => {
        setTooltipStyle(draft => {
            draft.backgroundColor = backgroundColor
            draft.color = textColor
            switch (placement) {
                case 'top':
                    draft.bottom = '120%'
                    draft.left = '50%'
                    draft.top = undefined
                    draft.right = undefined
                    draft.transform = 'translateX(-50%) scale(0)'
                    draft.transformOrigin = 'bottom'
                    draft['--arrow-offset-left'] = '50%'
                    draft['--arrow-offset-top'] = '100%'
                    break
                case 'bottom':
                    draft.top = '120%'
                    draft.left = '50%'
                    draft.bottom = undefined
                    draft.right = undefined
                    draft.transform = 'translateX(-50%) scale(0)'
                    draft.transformOrigin = "top"
                    draft['--arrow-offset-left'] = '50%'
                    draft['--arrow-offset-top'] = '0'
                    break
                case 'left':
                    draft.right = '150%'
                    draft.top = '50%'
                    draft.left = undefined
                    draft.bottom = undefined
                    draft.transform = 'translateY(-50%) scale(0)'
                    draft.transformOrigin = 'left'
                    draft['--arrow-offset-left'] = '100%'
                    draft['--arrow-offset-top'] = '50%'
                    break
                case 'right':
                    draft.left = '150%'
                    draft.top = '50%'
                    draft.right = undefined
                    draft.bottom = undefined
                    draft.transform = 'translateY(-50%) scale(0)'
                    draft.transformOrigin = 'right'
                    draft['--arrow-offset-left'] = '0'
                    draft['--arrow-offset-top'] = '50%'
                    break
            }
        })

    }, [placement, backgroundColor, textColor])

    // 悬停延迟定时器
    const hoverTimeoutID = useRef<number | null>()
    // 离开延迟定时器
    const leaveTimeoutID = useRef<number | null>()

    const showTooltip = useCallback(
        () => {
            if (leaveTimeoutID.current) {
                clearTimeout(leaveTimeoutID.current)
                leaveTimeoutID.current = null
            }
            hoverTimeoutID.current =
                setTimeout(() => {
                        setTooltipStyle(draft => {
                            draft.opacity = 1
                            draft.transform = draft.transform?.replace('scale(0)', 'scale(1)')
                        })
                        hoverTimeoutID.current = null
                        onOpenChange(true)
                    }
                    , hoverDelay * 1000)
        }, [hoverDelay, onOpenChange]
    )

    const hideTooltip = useCallback(
        () => {
            if (hoverTimeoutID.current) {
                clearTimeout(hoverTimeoutID.current)
                hoverTimeoutID.current = null
            }
            leaveTimeoutID.current =
                setTimeout(() => {
                        setTooltipStyle(draft => {
                            draft.opacity = 0
                            draft.transform = draft.transform?.replace('scale(1)', 'scale(0)')
                        })
                        leaveTimeoutID.current = null
                        onOpenChange(false)
                    }
                    , leaveDelay * 1000)
        }, [leaveDelay, onOpenChange])


    return <div
        pos='relative'
        onClick={() => trigger === 'click' && showTooltip()}
        onMouseEnter={() => trigger === 'hover' && showTooltip()}
        onMouseLeave={hideTooltip}
    >
        <span
            select='none'
            transition="opacity"
            className='el-tooltip'
            style={tooltipStyle}
        >{title}</span>
        {children}
    </div>

}

export default Tooltip
