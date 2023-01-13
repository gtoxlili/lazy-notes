import {noop} from "@lib/helper";
import {AttributifyAttributes} from "windicss/types/jsx";
import './style.css'

interface CheckboxProps extends AttributifyAttributes {
    checked: boolean
    autoFocus?: boolean
    disabled?: boolean
    title?: string
    onChange?: (checked: boolean) => void
}

const Checkbox = (props: CheckboxProps) => {
    const {
        checked,
        title,
        autoFocus = false,
        disabled = false,
        onChange = noop,
        ...attributes
    } = props

    return (
        <label
            className='flex items-center' {...attributes}
        >
            <input
                // 样式
                type='checkbox'
                checked={checked}
                autoFocus={autoFocus}
                disabled={disabled}
                onChange={event => onChange(event.target.checked)}
                {...attributes}
                className="input-checkbox"
            />
            <span
                select='none'
                font='antialiased medium'
                text='sm right'
                flex='1'
            >{title}
            </span>
        </label>
    )
}

export default Checkbox
