"use client";

import {
  useCreateTeamMember,
  useFindManyTeamRequest,
  useUpdateManyTeamRequest,
} from "@/generated/hooks";
import { useQueryClient } from "@tanstack/react-query";

interface Iprops {
  teamId: string;
}

interface CustomError extends Error {
  code?: string;
}
const TeamRequests = (props: Iprops) => {
  const queryClient = useQueryClient();
  const { teamId } = props;
  const { mutate: createMember } = useCreateTeamMember();

  const { data: requests = [] } = useFindManyTeamRequest({
    where: { teamId: teamId, status: "pending" },
  });

  const { mutate: updateRequest } = useUpdateManyTeamRequest();
  function isCustomError(error: unknown): error is CustomError {
    return error instanceof Error && "code" in error;
  }

  const handleApprove = (requestId: string, requesterId: string) => {
    try {
      updateRequest({
        where: { id: requestId },
        data: { status: { set: "approved" } },
      });

      createMember({
        data: {
          teamId: teamId,
          userId: requesterId,
          role: "MEMBER",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["teamTodos"] });
      queryClient.invalidateQueries({ queryKey: ["team"] });
    } catch (error) {
      if (isCustomError(error) && error.code === "P2004") {
        alert("您不是管理员，需要管理员才能进行操作");
      }
    }
  };

  const handleRejected = (requesterId: string) => {
    try {
      updateRequest({
        where: { id: requesterId },
        data: { status: { set: "rejected" } },
      });

      queryClient.invalidateQueries({ queryKey: ["teamTodos"] });
      queryClient.invalidateQueries({ queryKey: ["team"] });
    } catch (error) {
      if (isCustomError(error) && error.code === "P2004") {
        alert("您不是管理员，需要管理员才能进行操作");
      }
    }
  };

  return (
    <div>
      <h5>待处理的加入申请</h5>
      {requests.map((request) => (
        <div key={request.id}>
          <span>用户{request.requesterId}申请加入</span>
          <button
            onClick={() => handleApprove(request.id, request.requesterId)}
          >
            通过
          </button>
          <button onClick={() => handleRejected(request.id)}>拒绝</button>
        </div>
      ))}
    </div>
  );
};

export default TeamRequests;
