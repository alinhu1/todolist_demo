"use client";

import { useCreateRequest, useFindManyUser } from "@/generated/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Image from "next/image";

interface IProps {
  currentUserId: string;
}
const SearchUser = (props: IProps) => {
  const { currentUserId } = props;
  const queryClient = useQueryClient();
  const { data: users = [] } = useFindManyUser();
  const [message, setMessage] = useState("");

  const { mutate: createRequest } = useCreateRequest({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      setMessage("");
      console.log("成功发送请求");
    },
  });

  return (
    <div className="search-section">
      <div className="search-box">
        {users
          .filter((user) => user.id !== currentUserId)
          .map((user) => (
            <div className="share_user" key={user.id}>
              <div className="user_all">
                <Image
                  src="/images/userdemo.png"
                  alt="头像模型"
                  width={35}
                  height={35}
                  priority
                  className="headdemo"
                />
                <div className="user_message_id">
                  <div className="user_message">用户 ID</div>
                  <div className="user_id">{user.id}</div>
                </div>
              </div>
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
                请求访问
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchUser;
