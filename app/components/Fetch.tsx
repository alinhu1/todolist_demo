"use client"

import { useEffect } from "react"
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