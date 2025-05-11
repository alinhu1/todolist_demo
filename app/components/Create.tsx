"use client";

import { useCreateTodos } from "@/generated/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface IProps {
  userId: string;
}

const Create = (props: IProps) => {
  const { userId } = props;
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState("");
  const { mutate: createTodo } = useCreateTodos({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setInputValue("");
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputValue === "") {
      return;
    }
    if (event.key === "Enter") {
      createTodo({
        data: {
          name: inputValue.trim(),
          completed: false,
          userId: userId,
        },
      });
    }
  };

  return (
    <div className="add_todo">
      <input
        type="text"
        placeholder=" ＋  添加新任务..."
        className="todo_input"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        onKeyDown={handleKeyDown}
      ></input>
      <button className="add_btn">添加任务</button>
    </div>
  );
};
export default Create;
