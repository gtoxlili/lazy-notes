import en_US from './en_US'
import zh_CN from './zh_CN'
import Infer from "@lib/type";
import {IsEqual} from "type-fest";

export const Language = {
    en_US,
    zh_CN,
}

export type Lang = keyof typeof Language

type US = typeof Language.en_US
type CN = typeof Language.zh_CN

// i18n 结构
export type LocalizedType = IsEqual<Infer<US>, Infer<CN>> extends true ? US : never

export function getDefaultLanguage(): Lang {
    for (const language of window.navigator.languages) {
        if (language.includes('zh')) {
            return 'zh_CN'
        } else if (language.includes('us')) {
            return 'en_US'
        }
    }
    return 'zh_CN'
}
