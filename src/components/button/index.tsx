import React, {CSSProperties, ReactNode, useCallback, useMemo} from "react";
import classnames from "classnames";
import './style.css'
import {useImmer} from "use-immer";
import dayjs from "dayjs";
import {colorAddOpacity, noop} from "@lib/helper";

interface ButtonProps {
    disabled?: boolean
    fullWidth?: boolean
    loading?: boolean
    color: string
    children?: ReactNode
    variant?: 'contained' | 'outlined'
    onClick?: () => void
}

export const Button = (props: ButtonProps) => {
    const {
        disabled,
        fullWidth,
        loading,
        color,
        children,
        variant = 'contained',
        onClick
    } = props

    const [rippleList, setRippleList] = useImmer<ReactNode[]>([])

    const btnStyle = useMemo(() => {
        return variant === 'contained' ? {
            backgroundColor: color,
            color: '#fff'
        } : {
            borderColor: color,
            color: color,
            backgroundColor: 'transparent'
        }
    }, [color])

    const onBtnClick = useCallback((en: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // 获取相对父元素的坐标
        const style = {
            top: en.clientY - en.currentTarget.offsetTop,
            left: en.clientX - en.currentTarget.offsetLeft,
            backgroundColor: colorAddOpacity(color, 0.5)
        } satisfies CSSProperties

        setRippleList(draft => {
            draft.push(
                <span
                    key={dayjs().valueOf()}
                    className='btn-ripple'
                    onAnimationEnd={() =>
                        setRippleList(draft => {
                            draft.shift()
                        })
                    }
                    style={style}
                />
            )
        })
    }, [setRippleList, color])

    return <button
        disabled={disabled || loading}
        className={
            classnames(
                'btn',
                'text-sm',
                'font-bold',
                'tracking-wider',
                {'w-full': fullWidth},
                "transition-opacity",
                {'btn-contained': variant === 'contained'}
            )}
        style={btnStyle}
        onMouseDown={variant === 'outlined' ? onBtnClick : noop}
        onClick={onClick}
    >
        {
            loading && <
                svg
                className="animate-spin mx-2" xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24" width="18" height="18" color='#fff'
            >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
        }
        {rippleList}
        {children}
    </button>
}
