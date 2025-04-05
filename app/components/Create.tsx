import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

const Create = () => {
    const queryClient = useQueryClient()
    const [inputValue, setInputValue] = useState('')

    const createMutation = useMutation({
        mutationFn: (newTodo: { name: string }) => fetch('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newTodo, completed: false })
        }),
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
            createMutation.mutate({ name: inputValue.trim() })
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


