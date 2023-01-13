import React, {Suspense, useDeferredValue, useLayoutEffect, useState} from "react";
import {Input} from "@components/input";
import {Icon} from '@iconify/react';
import formatLetterCase from '@iconify/icons-mdi/format-letter-case';
import {useI18n, useVisible} from "@lib/hook";
import './style.css'
import AutoExpansion from "@components/autoExpansion";
import {Skeleton} from "@components/skeleton";
import Tooltip from "@components/tooltip";

export function Search() {
    console.log('render search')
    const [searchText, setSearchText] = useState('')
    const deferredText = useDeferredValue(searchText)
    // 区分大小写
    const {visible: caseSensitive, toggle: toggleCaseSensitive} = useVisible()
    const {translation} = useI18n()

    useLayoutEffect(() => {
        console.log('search', deferredText)
        console.log('caseSensitive', caseSensitive)
    }, [deferredText, caseSensitive])

    return <>
        <div
            flex='~ col'
            className="search"
        >
            <Input value={searchText} onChange={setSearchText}
                   suffixIcon={
                       <Tooltip
                           title={translation("sideBar.search.caseSensitive")}
                           hoverDelay={0.5}
                           leaveDelay={0.5}
                       >
                           <Icon
                               color={caseSensitive ? '#000' : '#999'}
                               icon={formatLetterCase}
                               onClick={toggleCaseSensitive}
                               width="22"
                               height="24"
                           />
                       </Tooltip>
                   }/>
            <Suspense fallback={
                <AutoExpansion childrenHeight={68}><Skeleton/></AutoExpansion>
            }>
                {/*
                todo 搜索结果
                */}
                <AutoExpansion childrenHeight={68}><Skeleton/></AutoExpansion>
            </Suspense>
        </div>
    </>
}
