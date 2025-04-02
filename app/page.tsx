'use client'
import React, { useState } from "react";
import Fetch from "./components/Fetch";
import Create from "./components/Create";

export interface Todo {
  id: number,
  name: string,
  completed: boolean
}

export default function Home() {
  const [todo, setTodo] = useState<Todo[]>([])
  return (
    <div className="content">
      <h1>TODO LIST</h1>
      <Create todo={todo} setTodo={setTodo} />
      <ul>
        <Fetch todo={todo} setTodo={setTodo} />
      </ul>
      <span>还有1个未完成</span>
      <div>
        <span>筛选：</span>
        <button>全部 </button>
        <button>未完成 </button>
        <button>已完成</button>
      </div>

    </div>
  )
}
