"use client";

import { useCreateTeamRequest, useFindManyTeam } from "@/generated/hooks";
import { useState } from "react";
import Image from "next/image";

interface IProps {
  userId: string;
}

const JoinTeamRequest = ({ userId }: IProps) => {
  const [searchTerm] = useState("");
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
      <h5>申请加入团队</h5>
      <div className="team-results">
        {teams
          .filter(
            (team) =>
              team.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
              team.createdById !== userId
          )
          .map((team) => (
            <div key={team.id} className="team-item">
              <div className="jointeam">
                <Image
                  src="/images/team-icon.png"
                  alt="团队icon"
                  width={30}
                  height={30}
                  priority
                  className="jointeam-icon"
                />
                <div>{team.name}</div>
              </div>
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
