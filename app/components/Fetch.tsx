"use client"

import { useEffect, useState } from "react"
//配置前端组件

interface Todo {
  id: number,
  name: string,
  completed: boolean
}

const Fetch = () => {
  const [todo, setTodo] = useState<Todo[]>([])
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
  }, [])
  return (
    <div>
      {todo.map((todo1) => (
        <li key={todo1.id}>
          {todo1.name}
          <span className="todo_item">
            {todo1.completed ? '√' : ' '}
          </span>
          <button>删除</button>
        </li>
      ))}
    </div>
  )
}
export default Fetch