"use client";

import { useState } from "react";

import { useFindManyTodos } from "@/generated/hooks";

interface IProps {
  currentUserId: string;
}

const ShareTodo = (props: IProps) => {
  const { currentUserId } = props;
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

  const [filter] = useState<"all" | "active" | "completed">("all");
  const onshow = todo.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    } else if (filter === "completed") {
      return todo.completed;
    } else {
      return true;
    }
  });

  const shareTodos = onshow.filter((todo) => todo.userId !== currentUserId);

  return (
    <div className="shareuser_todo">
      <div className="shareuser_todo_content">
        {shareTodos.map((todo1) => (
          <div key={todo1.id} className="share_todo">
            <span className="share_todo_name">{todo1.name}</span>
            <span className="share_todo_id">(来自用户 {todo1.user.id})</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ShareTodo;
