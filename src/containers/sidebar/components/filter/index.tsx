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

interface FilterItemProps {
    title: string
    children?: ReactNode
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
    return <DatePicker
        value={date}
        onClick={setDate}
        format='YYYY-MM-DD'
        disabledDate={testDisabledDate}
    />
}

const FilterItem = (props: FilterItemProps) => {
    const {title, children} = props
    return <div
        space='y-2'
        p='l-4 t-4'
    >
        <div
            text='sm color-[#00000072]'
            font='antialiased'
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

    return <>
        <FilterItem title={translation("sideBar.filter.type.title")}><FilterType/></FilterItem>
        <FilterItem title={translation("sideBar.filter.time.title")}><FilterDate/></FilterItem>
    </>
}
