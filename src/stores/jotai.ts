import {atom} from "jotai";
import {Client} from "@lib/axios";
import {atomWithStorage} from "jotai/utils";
import {getDefaultLanguage, Lang, LocalizedType} from "@i18n";
import {Get} from "type-fest";
import dayjs from "dayjs";

// 全局 i18n
export const localeAtom = atomWithStorage<Lang>('locale',
    getDefaultLanguage()
)

// axios 实例
interface AxiosInstanceItem {
    key: string
    instance: Client | null
}

export const axiosInstanceAtom = atom<AxiosInstanceItem>({} as AxiosInstanceItem);

// 当前页面根据条件筛选后的数据
export const filteredDataAtom = atom([])

// 当前页面的数据条数
export const totalAtom = atom(
    get => get(filteredDataAtom).length
);

// 筛选条件

export const filterTypeAtom = atom<
    Record<keyof Get<LocalizedType, "sideBar.filter.type.labels">, boolean>
>({
    text: true,
    media: true,
    links: true,
    file: true,
})

export const filterDateAtom = atom(dayjs().format('YYYY-MM-DD'))

export const filterTagAtom = atomWithStorage<string[]>('filterTag', [])
