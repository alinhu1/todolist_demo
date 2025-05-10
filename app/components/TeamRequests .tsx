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
    <div className="joinrequest">
      <h5>待处理的加入申请</h5>
      <span className="introduction">处理团队成员的加入申请</span>
      {requests.map((request) => (
        <div key={request.id} className="user_joinrequest">
          <div className="user_request_join">
            用户{request.requesterId}申请加入
          </div>
          <div>
            <button
              className="joinrequest_approved_btn"
              onClick={() => handleApprove(request.id, request.requesterId)}
            >
              同意
            </button>
            <button
              className="joinrequest_rejected_btn"
              onClick={() => handleRejected(request.id)}
            >
              拒绝
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamRequests;
