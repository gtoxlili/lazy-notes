import {useImmer} from "use-immer";
import {useRef} from "react";

interface TodoList {
    id: number;
    title: string;
}

const Index = () => {
    const [todoList, setTodoList] = useImmer<TodoList[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    return <>
        {
            todoList.map((todo) => {
                return <div key={todo.id}>{todo.title}</div>
            })
        }
        <input type="text" ref={inputRef}/>
        <button onClick={() => {
            setTodoList(draft => {
                draft.push({
                    id: Date.now(),
                    title: inputRef.current?.value ?? ''
                })
            })
        }}>Add
        </button>
    </>
}

export default Index
