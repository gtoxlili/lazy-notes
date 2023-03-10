import React, {ReactNode} from "react";
import './style.css'
import Checkbox from "@components/checkbox";
import {filterDateAtom, filterTypeAtom} from "@stores/jotai";
import {useImmerAtom} from "jotai-immer";
import {useI18n} from "@lib/hook";
import {Get} from "type-fest";
import {LocalizedType} from "@i18n";
import DatePicker from "@components/datePicker";
import {useAtom} from "jotai";
import {Button} from "@components/button";

interface FilterItemProps {
    title: string
    children?: ReactNode
    isEnd?: boolean
}


const FilterType = () => {
    const [type, setTypeFilter] = useImmerAtom(filterTypeAtom)
    const {translation} = useI18n()
    return <>
        {
            Object.keys(type).map((key) => {
                const rk = key as keyof Get<LocalizedType, "sideBar.filter.type.labels">
                return <Checkbox
                    key={rk}
                    title={translation(`sideBar.filter.type.labels.${rk}`)}
                    checked={type[rk]}
                    onChange={
                        (checked) => {
                            setTypeFilter(draft => {
                                draft[rk] = checked
                            })
                        }
                    }
                />
            })
        }
    </>
}

// 用于测试
const testDisabledDate = () => {
    // 随机返回
    return Math.random() > 0.5
}

const FilterDate = () => {
    const [date, setDate] = useAtom(filterDateAtom)
    const {translation} = useI18n()
    return <DatePicker
        value={date}
        onClick={setDate}
        format='YYYY-MM-DD'
        disabledDate={testDisabledDate}
        i18n={translation('sideBar.filter.time.datePickerType') as 'zh-cn' | 'en'}
        tooltipText={translation('sideBar.filter.time.tooltip')}
    />
}

const FilterItem = (props: FilterItemProps) => {
    const {title, children, isEnd} = props
    return <div
        space='y-2'
        p='l-4 t-4'
        flex={isEnd ? 'auto' : 'none'}
    >
        <div
            text='sm color-[#00000072]'
            p='l-1 b-1'
            m='r-2'
            border='b color-[#e8e8e8] solid'
        >
            {title}
        </div>
        <div
            space='y-4'
            p='r-8 l-2.5 t-2'
        >
            {children}
        </div>
    </div>
}
export default function Filter() {
    const {translation} = useI18n()

    return <div flex='~ col' className='filter'>
        <FilterItem title={translation("sideBar.filter.type.title")}><FilterType/></FilterItem>
        <FilterItem title={translation("sideBar.filter.time.title")}><FilterDate/></FilterItem>
        <FilterItem title={translation("sideBar.filter.tag.title")} isEnd={true}></FilterItem>
        <div p='b-3 x-6 t-2'><Button fullWidth={true} color='#000' variant='outlined'>重置</Button></div>
    </div>
}
