"use client";

import {
  useCreateTeamTodos,
  useDeleteTeamTodos,
  useFindManyTeamTodos,
  useUpdateTeamTodos,
} from "@/generated/hooks";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

interface Iprops {
  userId: string;
  teamId: string;
}
const TeamTodo = (props: Iprops) => {
  const { userId, teamId } = props;
  const queryClient = useQueryClient();
  console.log("[TeamTodo] 当前用户ID:", userId);
  const [inputTeamValue, setInputTeamValue] = useState("");

  const { data: teamTodos = [] } = useFindManyTeamTodos({
    where: {
      teamId: teamId,
    },
    include: {
      team: {
        include: {
          members: true,
        },
      },
    },
  });
  console.log("[TeamTodo] 获取到的数据:", teamTodos);

  const { mutate: createTeamTodo } = useCreateTeamTodos({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teamTodos", { teamId }],
      });
      setInputTeamValue("");
    },
  });

  const handleTeamKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputTeamValue === "") {
      return;
    }
    if (event.key === "Enter" && inputTeamValue.trim()) {
      createTeamTodo({
        data: {
          name: inputTeamValue.trim(),
          creatorId: userId,
          teamId: teamId,
        },
      });
      setInputTeamValue("");
    }
  };

  const { mutate: deleteTeamTodo } = useDeleteTeamTodos({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamTodos", { teamId }] });
    },
  });

  const { mutate: updateTeamTodo } = useUpdateTeamTodos({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamTodos", { teamId }] });
    },
  });

  const count = teamTodos.filter((teamTodo) => !teamTodo.completed).length;

  return (
    <div>
      <h3>团队代办事项</h3>
      <input
        type="text"
        placeholder="添加团队任务"
        onChange={(e) => setInputTeamValue(e.target.value)}
        value={inputTeamValue}
        onKeyDown={handleTeamKeyDown}
      />
      <ul>
        {teamTodos.map((teamTodo) => (
          <li key={teamTodo.id}>
            <span>{teamTodo.name}</span>
            <span>(创建者:{teamTodo.creatorId})</span>
            <span
              className={`todo_item ${teamTodo.completed ? "todo_item_active" : ""}`}
              onClick={() =>
                updateTeamTodo({
                  where: { id: teamTodo.id },
                  data: { completed: !teamTodo.completed },
                })
              }
            ></span>
            <button
              onClick={() => {
                deleteTeamTodo({
                  where: { id: teamTodo.id },
                });
              }}
            >
              删除
            </button>
          </li>
        ))}
      </ul>
      <span>还有 {count} 个未完成</span>
    </div>
  );
};

export default TeamTodo;
