import {CSSProperties, ReactNode, useCallback, useLayoutEffect, useRef} from "react";
import {noop} from "@lib/helper";
import './style.css'
import {useImmer} from "use-immer";
import {PLACEMENT_MAP, PlacementType} from "@components/tooltip/type";

interface ToolTipProps {
    children: ReactNode
    title: string
    placement?: PlacementType
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
    /**
     * 是否禁用
     */
    disabled?: boolean

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
        disabled = false
    } = props
    const [tooltipStyle, setTooltipStyle] = useImmer<CSSProperties>({opacity: 0} as CSSProperties)

    useLayoutEffect(() => {
        setTooltipStyle(draft => {
            draft.backgroundColor = backgroundColor
            draft.color = textColor
            Object.assign(draft, PLACEMENT_MAP[placement])
        })
    }, [placement, backgroundColor, textColor])

    // 悬停延迟定时器
    const hoverTimeoutID = useRef<number | null>()
    // 离开延迟定时器
    const leaveTimeoutID = useRef<number | null>()

    const showTooltip = useCallback(
        () => {
            if (leaveTimeoutID.current) {
                window.clearTimeout(leaveTimeoutID.current)
                leaveTimeoutID.current = null
            }
            hoverTimeoutID.current =
                window.setTimeout(() => {
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
                window.clearTimeout(hoverTimeoutID.current)
                hoverTimeoutID.current = null
            }
            leaveTimeoutID.current =
                window.setTimeout(() => {
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
        flex='~'
        onClick={() => !disabled && trigger === 'click' && showTooltip()}
        onMouseEnter={() => !disabled && trigger === 'hover' && showTooltip()}
        onMouseLeave={() => !disabled && hideTooltip()}
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
