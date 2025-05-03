"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useDeleteTodos,
  useFindManyTodos,
  useUpdateTodos,
} from "@/generated/hooks";

interface IProps {
  currentUserId: string;
}

const Fetch = (props: IProps) => {
  const { currentUserId } = props;
  const queryClient = useQueryClient();
  const { data: todo = [] } = useFindManyTodos({
    where: {
      OR: [
        { userId: currentUserId },
        {
          user: {
            receivedRequests: {
              some: {
                requesterId: currentUserId,
                status: "approved",
              },
            },
          },
        },
      ],
    },
    include: {
      user: true,
    },
  });

  const { mutate: deleteMutation } = useDeleteTodos({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: updateMutation } = useUpdateTodos({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const onshow = todo.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    } else if (filter === "completed") {
      return todo.completed;
    } else {
      return true;
    }
  });

  const myTodos = onshow.filter((todo) => todo.userId === currentUserId);
  const shareTodos = onshow.filter((todo) => todo.userId !== currentUserId);

  const count = myTodos.filter((todo) => !todo.completed).length;

  return (
    <div>
      <h4>我的代办事项</h4>
      {myTodos.map((todo1) => (
        <li key={todo1.id}>
          {todo1.name}
          <span
            className={`todo_item ${todo1.completed ? "todo_item_active" : ""}`}
            onClick={() =>
              updateMutation({
                where: { id: todo1.id },
                data: { completed: !todo1.completed },
              })
            }
          ></span>
          <button
            onClick={() => {
              deleteMutation({
                where: { id: todo1.id },
              });
            }}
          >
            删除
          </button>
        </li>
      ))}

      <h4>共享的代办事项</h4>
      {shareTodos.map((todo1) => (
        <li key={todo1.id}>
          {todo1.name}
          <span>(来自用户{todo1.user.id})</span>
        </li>
      ))}

      <span>还有 {count}个未完成</span>
      <div>
        <span>筛选：</span>
        <button onClick={() => setFilter("all")}>全部 </button>
        <button onClick={() => setFilter("active")}>未完成 </button>
        <button onClick={() => setFilter("completed")}>已完成</button>
      </div>
    </div>
  );
};
export default Fetch;
