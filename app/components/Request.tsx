"use client";

import { useFindManyRequest, useUpdateManyRequest } from "@/generated/hooks";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

interface IProps {
  currentUserId: string;
}

const Request = (props: IProps) => {
  const queryClient = useQueryClient();
  const { currentUserId } = props;
  const { data: requests = [] } = useFindManyRequest({
    where: {
      targetUserId: currentUserId,
      status: "pending",
    },
    include: { requester: true },
  });
  const { mutate: updateRequest } = useUpdateManyRequest({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      console.log("请求状态已更新");
    },
  });

  const handleResponse = (
    requestId: string,
    status: "approved" | "rejected"
  ) => {
    updateRequest({
      where: { id: requestId },
      data: { status: { set: status } },
    });
  };

  return (
    <div>
      <hr />
      <h3>待处理的请求访问</h3>
      {requests.length == 0 ? (
        <p>暂无新请求</p>
      ) : (
        requests.map((request) => (
          <div key={request.id}>
            <p>来自用户{request.requester.id}请求访问</p>
            {request.message && <p>留言:{request.message}</p>}
            <button onClick={() => handleResponse(request.id, "approved")}>
              同意
            </button>
            <button onClick={() => handleResponse(request.id, "rejected")}>
              拒绝
            </button>
          </div>
        ))
      )}
    </div>
  );
};
export default Request;
