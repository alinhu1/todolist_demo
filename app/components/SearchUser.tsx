"use client";

import { useCreateRequest, useFindManyUser } from "@/generated/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface IProps {
  currentUserId: string;
}
const SearchUser = (props: IProps) => {
  const { currentUserId } = props;
  const queryClient = useQueryClient();
  const { data: users = [] } = useFindManyUser();
  const [message, setMessage] = useState("");

  //创建请求
  const { mutate: createRequest } = useCreateRequest({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      setMessage("");
      console.log("成功发送请求");
    },
  });

  return (
    <div className="search-section">
      <hr />
      <h3>发送访问请求</h3>
      <div className="search-box">
        <input
          type="text"
          placeholder="可选留言"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {users
          .filter((user) => user.id !== currentUserId)
          .map((user) => (
            <li key={user.id}>
              用户 ID:{user.id}
              <button
                onClick={() => {
                  createRequest({
                    data: {
                      requesterId: currentUserId,
                      targetUserId: user.id,
                      status: "pending",
                      message: message || undefined,
                    },
                  });
                }}
              >
                请求访问该用户
              </button>
            </li>
          ))}
      </div>
    </div>
  );
};

export default SearchUser;
