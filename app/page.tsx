import Fetch from "./components/Fetch";

export default function Home() {
  return (
    <div className="content">
      <h1>TODO LIST</h1>
      <input type="text" placeholder="你想做点什么" className="todo_input"></input>
      <ul>
        <Fetch />
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
