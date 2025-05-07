"use client";

import { useCreateTeamRequest, useFindManyTeam } from "@/generated/hooks";
import { useState } from "react";

interface IProps {
  userId: string;
}

const JoinTeamRequest = ({ userId }: IProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  const { data: teams = [] } = useFindManyTeam();
  const { mutate: createRequest } = useCreateTeamRequest({
    onSuccess: () => {
      console.log("申请已提交");
      setMessage("");
    },
  });

  const handleJoinTeam = (teamId: string) => {
    createRequest({
      data: {
        teamId: teamId,
        requesterId: userId,
        message: message,
        status: "pending",
      },
    });
  };

  return (
    <div className="join-team">
      <hr />
      <h3>申请加入团队</h3>
      <input
        type="text"
        placeholder="搜索团队名称"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="team-results">
        {teams
          .filter(
            (team) =>
              team.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
              team.createdById !== userId
          )
          .map((team) => (
            <div key={team.id} className="team-item">
              <span>{team.name}</span>
              <input
                type="text"
                placeholder="留言（可选）"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={() => {
                  handleJoinTeam(team.id);
                }}
              >
                申请加入
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default JoinTeamRequest;
