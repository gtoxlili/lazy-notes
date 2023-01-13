import {useCallback, useRef, useState} from "react";
import Config from "../config";
import {axiosInstanceAtom, localeAtom} from "@stores/jotai";
import {useAtom} from "jotai";
import {Client} from "@lib/axios";
import {Language, LocalizedType} from "@i18n";
import {Get} from "type-fest";
import {get} from "lodash-es";
import Infer from "@lib/type";

export function useRefDom(
    tagName: string,
    action?: (dom: HTMLElement) => void,
) {
    const eleRef = useRef<HTMLElement>()
    if (!eleRef.current) {
        eleRef.current = document.createElement(tagName)
        action && action(eleRef.current)
    }
    return eleRef.current
}

export function useVisible(initial = false) {
    const [visible, setVisible] = useState(initial)
    const hide = () => {
        setVisible(false)
    }
    const show = () => {
        setVisible(true)
    }
    const toggle = () => {
        setVisible(!visible)
    }
    return {
        visible,
        hide,
        show,
        toggle,
    }
}

export function useClient() {
    const {bashUrl, secret} = Config
    const [item, setItem] = useAtom(axiosInstanceAtom)
    if (item.key !== bashUrl) {
        setItem({
            key: bashUrl,
            instance: new Client(bashUrl, secret),
        })
    }
    return item.instance!
}

export function useI18n() {
    const [locale, setLocale] = useAtom(localeAtom)
    const translation = useCallback(<P extends Infer<LocalizedType>>(path: P) => {
        return get(Language[locale], path) as Get<LocalizedType, P>
    }, [locale])

    return {
        locale,
        setLocale,
        translation,
    }
}

