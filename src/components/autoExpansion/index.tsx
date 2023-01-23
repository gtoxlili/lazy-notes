import {ReactNode, useCallback, useEffect, useRef} from "react";
import {useImmer} from "use-immer";

interface AutoExpansionProps {
    children: ReactNode
    childrenHeight: number
}

const AutoExpansion = (props: AutoExpansionProps) => {
    console.log("AutoExpansion is rendering")
    const {children, childrenHeight} = props

    const ref = useRef<HTMLDivElement>(null)
    const [itemComponents, setItemComponents] = useImmer<ReactNode[]>([])
    const handleSize = useCallback(() => {
        if (!ref.current) {
            return
        }
        // 向下取整
        const cnt = Math.round((ref.current.clientHeight - 16) / childrenHeight)
        setItemComponents(
            draft => {
                // 当 draft.length 大于 cnt 时, 删除多余的元素
                if (draft.length > cnt) {
                    draft.splice(cnt, draft.length - cnt)
                } else if (draft.length < cnt) { // 当 draft.length 小于 cnt 时, 添加元素
                    for (let i = draft.length; i < cnt; i++) {
                        draft.push(children)
                    }
                }
            }
        )
    }, [setItemComponents, ref])

    useEffect(() => {
        handleSize() // 初始化
        window.addEventListener('resize', handleSize)
        return () => {
            window.removeEventListener('resize', handleSize)
        }
    }, [])
    return <div
        p='x-4 y-2'
        h='full'
        overflow='hidden'
        ref={ref}>
        {itemComponents}
    </div>
}

export default AutoExpansion
