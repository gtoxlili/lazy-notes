import React, {ReactNode} from "react";
import './style.css'
import Checkbox from "@components/checkbox";
import {filterTypeAtom} from "@stores/jotai";
import {useImmerAtom} from "jotai-immer";
import {useI18n} from "@lib/hook";
import {Get} from "type-fest";
import {LocalizedType} from "@i18n";
import message from "@components/message";

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

export function Filter() {
    const {translation} = useI18n()
    return <>
        <FilterItem title={translation("sideBar.filter.type.title")}><FilterType/></FilterItem>
        <button onClick={() => message.info('this is a messag3123123e')}>info</button>
        <br/>
        <button onClick={() => message.success('this is a mes312312312312sage')}>success</button>
        <br/>
        <button onClick={() => message.error('this is a messa312312312321312321312313131ge')}>error</button>
        <br/>
        <button onClick={() => message.warning('this is a message')}>warning</button>

    </>
}
