import React, {FocusEvent, KeyboardEvent, ReactNode, useCallback} from "react";
import './style.css'
import {noop} from "@lib/helper";
import {AttributifyAttributes} from "windicss/types/jsx";

interface InputProps extends AttributifyAttributes {
    value?: string
    autoFocus?: boolean
    disabled?: boolean
    onChange: (value: string) => void
    onBlur?: (event?: FocusEvent<HTMLInputElement>) => void
    onEnter?: (event?: KeyboardEvent<HTMLInputElement>) => void
    suffixIcon?: ReactNode
}

export function Input(props: InputProps) {

    const {
        value = '',
        autoFocus = false,
        disabled = false,
        onChange,
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
            w='full'
            p='x-4'
            pos='relative'
            m='y-3'
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
                onKeyDown={handleKeyDown}
                className='input-text focus:shadow-md'
                {...attributes}
            />
        </div>
    )
}
