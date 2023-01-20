import React, {FocusEvent, forwardRef, KeyboardEvent, ReactNode, Ref, useCallback} from "react";
import './style.css'
import {noop} from "@lib/helper";
import {AttributifyAttributes} from "windicss/types/jsx";

interface InputProps extends AttributifyAttributes {
    value?: string
    autoFocus?: boolean
    disabled?: boolean
    onChange: (value: string) => void
    onFocus?: (event?: FocusEvent<HTMLInputElement>) => void
    onBlur?: (event?: FocusEvent<HTMLInputElement>) => void
    onEnter?: (event?: KeyboardEvent<HTMLInputElement>) => void
    suffixIcon?: ReactNode

    caret?: string
}

export const Input = forwardRef(
    (props: InputProps, ref: Ref<HTMLDivElement>) => {

        const {
            value = '',
            autoFocus = false,
            disabled = false,
            onChange,
            onFocus = noop,
            onBlur = noop,
            onEnter = noop,
            suffixIcon,
            ...attributes
        } = props

        const handleKeyDown = useCallback(
            (e: KeyboardEvent<HTMLInputElement>) => {
                if (e.code === 'Enter') {
                    onEnter(e)
                }
            }, [onEnter])

        return (
            <div
                ref={ref}
                pos='relative'
            >
                <div className='suffixIcon'>
                    {suffixIcon}
                </div>
                <input
                    disabled={disabled}
                    value={value}
                    autoFocus={autoFocus}
                    onChange={event => onChange(event.target.value)}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyDown={handleKeyDown}
                    className='input-text focus:shadow-md'
                    {...attributes}
                />
            </div>
        )
    })
