"use client"

import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useDeleteTodos, useFindManyTodos, useUpdateTodos } from "@/generated/hooks"

const Fetch = () => {
  const queryClient = useQueryClient()
  const { data: todo = [] } = useFindManyTodos()

  const { mutate: deleteMutation } = useDeleteTodos({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })

  const { mutate: updateMutation } = useUpdateTodos({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const onshow = todo.filter((todo) => {
    if (filter === 'active') {
      return !todo.completed
    } else if (filter === 'completed') {
      return todo.completed
    } else {
      return true
    }
  })

  const count = todo.filter((todo) => !todo.completed).length

  return (
    <div>
      {onshow.map((todo1) => (
        <li key={todo1.id}>
          {todo1.name}
          <span className={`todo_item ${todo1.completed ? 'todo_item_active' : ''}`}
            onClick={() => updateMutation({
              where: { id: todo1.id },
              data: { completed: !todo1.completed }
            })
            }>
          </span>
          <button
            onClick={() => {
              deleteMutation({
                where: { id: todo1.id }
              })
            }} >删除</button>
        </li>
      ))}

      <span>还有 {count}个未完成</span>
      <div>
        <span>筛选：</span>
        <button onClick={() => setFilter('all')}>全部 </button>
        <button onClick={() => setFilter('active')} >未完成 </button>
        <button onClick={() => setFilter('completed')}>已完成</button>
      </div>
    </div>
  )
}
export default Fetch