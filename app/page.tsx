'use client'

import Fetch from "./components/Fetch";
import Create from "./components/Create";

export interface Todo {
  id: number,
  name: string,
  completed: boolean
}

export default function Home() {
  return (
    <div className="content">
      <h1>TODO LIST</h1>
      <Create />
      <ul>
      <Fetch />
      </ul>
    </div>
  )
}
