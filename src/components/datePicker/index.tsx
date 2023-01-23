import {noop} from "@lib/helper";
import {Input} from "@components/input";
import React, {CSSProperties, memo, useCallback, useMemo, useRef, useState} from "react";
import './style.css';

import {Icon} from '@iconify/react';
import chevronLeft from '@iconify/icons-mdi/chevron-left';
import chevronDoubleLeft from '@iconify/icons-mdi/chevron-double-left';
import chevronDoubleRight from '@iconify/icons-mdi/chevron-double-right';
import chevronRight from '@iconify/icons-mdi/chevron-right';
import classnames from "classnames";
import dayjs, {Dayjs} from "dayjs";
import {useVisible} from "@lib/hook";
import {createPortal} from "react-dom";

import calendarRange from '@iconify/icons-mdi/calendar-range';
import Tooltip from "@components/tooltip";

interface PickerHeaderProps {
    date: Dayjs
    setDate: (date: Dayjs | ((date: Dayjs) => Dayjs)) => void
    i18n: 'zh-cn' | 'en'
}

const PickerHeader = memo((props: PickerHeaderProps) => {
    const {
        date,
        setDate,
        i18n
    } = props;

    return <div
        flex='~'
        space='x-2'
        m='b-3'
        align='items-center'
        className='picker-header'
    >
        <div onClick={() => setDate(
            (date) => date.subtract(1, 'year')
        )}><Icon icon={chevronDoubleLeft}/></div>
        <div onClick={() => setDate(
            (date) => date.subtract(1, 'month')
        )}><Icon icon={chevronLeft}/></div>
        <span
            flex='1'
            text='center sm '
            font='medium'
        >{date.locale(i18n).format('MMMM YYYY')}</span>
        <div onClick={() => setDate(
            (date) => date.add(1, 'month')
        )}><Icon icon={chevronRight}/></div>
        <div onClick={() => setDate(
            (date) => date.add(1, 'year')
        )}><Icon icon={chevronDoubleRight}/></div>
    </div>
})

interface TableHeaderProps {
    i18n: 'zh-cn' | 'en'
}

const TableHeader = memo((props: TableHeaderProps) => {
    const {i18n} = props;

    const weekDays = useMemo(() => {
            if (dayjs.locale() !== i18n) {
                dayjs.locale(i18n)
            }
            const weekDays = dayjs.weekdaysMin()
            return weekDays.map((day) =>
                <th key={day}>
                    <div>{day}</div>
                </th>
            )
        }, [i18n]
    )

    return <thead>
    <tr>{weekDays}</tr>
    </thead>
})

interface TableBodyProps {
    monthDays: {
        date: string | null,
        status: "show" | "hide" | "disabled",
        num: number,
        isWeekend: boolean
    }[][]
    onClick: (date: string) => void
}

const TableBody = memo((props: TableBodyProps) => {
    const {
        monthDays,
        onClick
    } = props;

    return <tbody>
    {
        monthDays.map((week, index) => <tr key={index}>
            {
                week.map((day, index) =>
                    <td key={index}>
                        <div
                            className={
                                classnames(
                                    {'enable': day.status === 'show'},
                                    {'invisible': day.status === 'hide'},
                                    {'disabled': day.status === 'disabled'},
                                    {'weekend': day.isWeekend && day.status === 'show'}
                                )
                            }
                            onClick={() => day.date && day.status === 'show' && onClick(day.date)}
                        >{day.num}
                        </div>
                    </td>)
            }
        </tr>)
    }
    </tbody>
})

interface IDatePickerProps {
    inputDate: string,
    disabledDate: (date: string) => boolean,
    format: string,
    onClick: (date: string) => void;
    visible: boolean;
    position: CSSProperties;
    i18n: 'zh-cn' | 'en'
}

const IDatePicker = memo((props: IDatePickerProps) => {
    const {
        inputDate,
        disabledDate,
        format,
        onClick,
        visible,
        position,
        i18n
    } = props;

    const [date, setDate] = useState(() => dayjs(inputDate));

    const dropDownStyle: CSSProperties = useMemo(() => {
        return {
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(50%, 0)',
            ...position
        }
    }, [visible, position])

    const monthDays = useMemo(
        () => {

            console.log('month days render')

            const dayjsObj = dayjs(date);
            // 本月有几天
            const daysCount = dayjsObj.daysInMonth()
            // 本月第一天是周几
            const firstDay = dayjsObj.startOf('month').day()

            // 嵌套数组，每个数组代表一周
            const monthDays: {
                date: string | null,
                status: 'show' | 'hide' | 'disabled'
                num: number,
                // 是否周末
                isWeekend: boolean
            }[][] = []

            for (let i = 0; i < daysCount + firstDay; i++) {
                const week = Math.floor(i / 7)
                const day = i % 7
                if (!monthDays[week]) {
                    monthDays[week] = []
                }
                if (i < firstDay) {
                    monthDays[week][day] = {
                        date: null,
                        status: 'hide',
                        num: 0,
                        isWeekend: day === 0 || day === 6
                    }
                } else {
                    const dayDate = dayjsObj.date(i - firstDay + 1).format(format)
                    monthDays[week][day] = {
                        date: dayDate,
                        status: disabledDate(dayDate) ? 'disabled' : 'show',
                        num: i - firstDay + 1,
                        isWeekend: day === 0 || day === 6
                    }
                }
            }
            return monthDays
        },
        [date, disabledDate, format]
    )

    return createPortal(<div
        z='4000'
        className='dropdown'
        select='none'
        style={dropDownStyle}
    >
        <div
            max-w='266px'
            w='266px'
        >
            <PickerHeader date={date} setDate={setDate} i18n={i18n}/>
            <table
                className='picker-body'
            >
                <TableHeader i18n={i18n}/>
                <TableBody monthDays={monthDays} onClick={onClick}/>
            </table>
        </div>
    </div>, document.body)
})


interface DatePickerProps {
    value: string;
    format?: string,
    onClick?: (date: string) => void;
    // 无法选中的日期
    disabledDate?: (date: string) => boolean,
    i18n?: 'zh-cn' | 'en',
    tooltipText?: string
}

// 蒙版
interface MaskProps {
    onClick: () => void;
}

const Mask = memo((props: MaskProps) => {
    const {
        onClick
    } = props;
    return createPortal(<div
            pos='fixed top-0 left-0 right-0 bottom-0'
            z='3999'
            onClick={onClick}
        />
        , document.body)
})

// 默认的 disabledDate
const defaultDisabledDate = () => false

const DatePicker = (props: DatePickerProps) => {

    const {
        // 如不存在则默认为当前时间
        format = 'YYYY-MM-DD',
        value,
        onClick = noop,
        disabledDate = defaultDisabledDate,
        i18n = "zh-cn",
        tooltipText
    } = props

    const inputDate = useRef(value)
    const inputRef = useRef<HTMLDivElement>(null)

    const {
        visible,
        hide,
        show
    } = useVisible(false)

    const datePickerClick = useCallback((date: string) => {
        onClick(date)
        hide()
    }, [onClick])

    const datePickerPosition = useMemo(() => {
        // 获取 inputRef 的右下角坐标
        const domRect = inputRef.current?.getBoundingClientRect()
        return {
            top: (domRect?.bottom || 0) + 8,
            left: domRect?.left
        }
    }, [inputRef.current])

    return <>
        <Input
            value={dayjs(value).format(format)}
            onChange={noop}
            onFocus={show}
            caret='transparent'
            ref={inputRef}
            suffixIcon={
                <Tooltip
                    title={tooltipText ?? ''}
                    hoverDelay={0.5}
                    placement='top'
                    disabled={!tooltipText}
                >
                    <Icon
                        color={visible ? '#000' : '#606266'}
                        icon={calendarRange}
                        width="18"
                        height="18"
                        display='block'
                        onClick={show}
                    />
                </Tooltip>
            }
        />
        {visible && <Mask onClick={hide}/>}
        <IDatePicker
            inputDate={inputDate.current}
            format={format}
            disabledDate={disabledDate}
            onClick={datePickerClick}
            visible={visible}
            position={datePickerPosition}
            i18n={i18n}
        />
    </>

}

export default DatePicker
