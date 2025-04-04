"use client"

import { useEffect, useState } from "react"
import { Todo } from "../page"
//配置前端组件

interface IProps {
  todo: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>
}

const Fetch = (props: IProps) => {
  const { todo, setTodo } = props
  console.log(todo);

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data);
        setTodo(data)
      })
  }, [setTodo])

  const handleDelete = async (id: number) => {
    await fetch(`/api/todos/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE'
    })
    setTodo(todo.filter(props => props.id !== id))
  }

  const CompleteStatus = async (id: number) => {
    const condition = todo.find(todo => todo.id === id)

    const response = await fetch(`/api/todos/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify({
        completed: !condition?.completed
      })
    })
    const updateTodo = await response.json()
    console.log(updateTodo);

    setTodo(
      todo.map((props) =>
        props.id === id ? { ...props, completed: !props.completed } : props)
    )
  }

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
            onClick={() => CompleteStatus(todo1.id)}
          >
          </span>
          <button onClick={() => { handleDelete(todo1.id) }}>删除</button>
        </li>

      ))}

      <span>还有{count}个未完成</span>
      <div>
        <span>筛选：</span>
        <button onClick={() => setFilter('all')}>全部 </button>
        <button onClick={() => setFilter('active')}>未完成 </button>
        <button onClick={() => setFilter('completed')}>已完成</button>
      </div>
    </div>

  )
}
export default Fetch