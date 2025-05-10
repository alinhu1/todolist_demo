"use client";

import {
  useCreateTeamTodos,
  useDeleteTeamTodos,
  useFindManyTeamTodos,
  useUpdateTeamTodos,
} from "@/generated/hooks";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Image from "next/image";

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
    <div className="teammanagement">
      <h3>团队管理</h3>
      <input
        type="text"
        placeholder="＋ 添加团队任务"
        className="addteam_todo"
        onChange={(e) => setInputTeamValue(e.target.value)}
        value={inputTeamValue}
        onKeyDown={handleTeamKeyDown}
      />
      <h4>团队代办事项</h4>
      <span className="introduction">管理您的所有团队任务</span>

      {teamTodos.map((teamTodo) => (
        <div key={teamTodo.id} className="teamtodo_id">
          <div>
            <Image
              src="/images/status-icon.png"
              alt="团队代办标记"
              width={20}
              height={20}
              priority
              className="status-icon"
            />
            <span className="teamtodo_name_margin">{teamTodo.name}</span>
            <span className="teamtodo_creator">
              (创建者:{teamTodo.creatorId})
            </span>
          </div>

          <div className="todo_icon_delete">
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
              <Image
                src="/images/delete1.png"
                alt="删除"
                width={20}
                height={20}
                priority
                className="team_deleted"
              />
            </button>
          </div>
        </div>
      ))}
      <div className="teamcount">还有 {count} 个未完成</div>
    </div>
  );
};

export default TeamTodo;
