import { useState } from "react";
import { Todo } from "../page";


interface IProps {
    todo: Todo[];
    setTodo: React.Dispatch<React.SetStateAction<Todo[]>>
}

const Create = (props: IProps) => {
    const { todo, setTodo } = props

    const [inputValue, setInputValue] = useState('')


    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (inputValue === '') {
            return
        }
        if (event.key === 'Enter') {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: inputValue.trim(),
                    completed: false
                })
            })
            const newTodos: Todo = await response.json()
            setTodo([...todo, newTodos])
            setInputValue('')
            console.log(`按下回车键的值:${inputValue}`);
            console.log(newTodos);
        }
    }
    console.log(todo);


    return (
        <div>
            <input type="text"
                placeholder="你想做点什么"
                className="todo_input"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                onKeyDown={handleKeyDown}></input>
        </div>
    )
}
export default Create


