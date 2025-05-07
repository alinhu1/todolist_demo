"use client";
import { useCreateTeam, useCreateTeamMember } from "@/generated/hooks";
import React, { useState } from "react";
import TeamList from "./TeamList";

interface Iprops {
  userId: string;
}

const TeamManagement = (props: Iprops) => {
  const { userId } = props;
  const [TeamName, setTeamName] = useState("");

  const { mutate: createTeam } = useCreateTeam({
    onSuccess: (newTeam) => {
      createTeamMember({
        data: {
          teamId: newTeam!.id,
          userId: userId,
          role: "ADMIN",
        },
      });
      setTeamName("");
    },
  });

  const handleTeamNameKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (TeamName === "") {
      return;
    }
    if (event.key === "Enter") {
      createTeam({
        data: {
          name: TeamName.trim(),
          createdById: userId,
        },
      });
    }
  };

  const { mutate: createTeamMember } = useCreateTeamMember();

  return (
    <div>
      <hr />
      <h3>团队管理</h3>
      <input
        type="text"
        placeholder="请创建团队名称"
        onChange={(e) => setTeamName(e.target.value)}
        value={TeamName}
        onKeyDown={handleTeamNameKeyDown}
      />

      <TeamList userId={userId}></TeamList>
    </div>
  );
};

export default TeamManagement;
