"use client";
import { useCreateTeam, useCreateTeamMember } from "@/generated/hooks";
import React, { useState } from "react";
import TeamList from "./TeamList";

interface Iprops {
  userId: string;
  selectedTeamId?: string;
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
      <input
        type="text"
        placeholder="+   新建团队"
        className="createteam"
        onChange={(e) => setTeamName(e.target.value)}
        value={TeamName}
        onKeyDown={handleTeamNameKeyDown}
      />

      <TeamList userId={userId} selectedTeamId={props.selectedTeamId} />
    </div>
  );
};

export default TeamManagement;
