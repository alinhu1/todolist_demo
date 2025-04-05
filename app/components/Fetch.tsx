"use client"

import { useState } from "react"
import { Todo } from "../page"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const Fetch = () => {
  const queryClient = useQueryClient()

  const { data: todo } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(res => res.json()),
    initialData: []
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => fetch(`/api/todos/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE'
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) => fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completed
      })
    }),
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
            onClick={() => updateMutation.mutate({
              id: todo1.id,
              completed: !todo1.completed
            })
            }>
          </span>
          <button
            onClick={() => { deleteMutation.mutate(todo1.id) }} >删除</button>
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