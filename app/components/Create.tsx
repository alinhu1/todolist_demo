import { useCreateTodos } from "@/generated/hooks"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

const Create = () => {
    const queryClient = useQueryClient()
    const [inputValue, setInputValue] = useState('')
    const { mutate: createTodo } = useCreateTodos({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
            setInputValue('')
        }

    })

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (inputValue === '') {
            return
        }
        if (event.key === 'Enter') {
            createTodo({
                data: {
                    name: inputValue.trim(),
                    completed: false
                }
            })
        }
    }

    return (
        <div>
            <input type="text"
                placeholder="你想做点什么"
                className="todo_input"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                onKeyDown={handleKeyDown}
            >
            </input>
        </div>
    )
}
export default Create


