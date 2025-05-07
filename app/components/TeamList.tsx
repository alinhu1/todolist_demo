"use client";

import { useFindManyTeam } from "@/generated/hooks";
import InviteForm from "./InviteForm";
import TeamRequests from "./TeamRequests ";
import TeamTodo from "./TeamTodo";

interface Iprops {
  userId: string;
}

const TeamList = (props: Iprops) => {
  const { userId } = props;
  const { data: teams = [] } = useFindManyTeam({
    where: {
      OR: [
        { createdById: userId },
        {
          members: {
            some: { userId },
          },
        },
      ],
    },
    include: {
      members: true,
      createdBy: true,
    },
  });

  return (
    <div>
      {teams.map((team) => (
        <li key={team.id}>
          {team.name}

          <TeamTodo userId={userId} teamId={team.id} />
          <InviteForm teamId={team.id} />
          <TeamRequests teamId={team.id} />
        </li>
      ))}
    </div>
  );
};
export default TeamList;
