"use client";

import { useFindManyTeam } from "@/generated/hooks";
import InviteForm from "./InviteForm";
import TeamRequests from "./TeamRequests ";
import TeamTodo from "./TeamTodo";

import Image from "next/image";

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
        <div key={team.id} className="teamname">
          <div>{team.name}</div>
          <span className="space">{ }</span>
          <Image src="/images/ellipsis.png" alt="省略号" width={20} height={20} priority className="ellipsis"/>
          {/* <TeamTodo userId={userId} teamId={team.id} />
          <InviteForm teamId={team.id} />
          <TeamRequests teamId={team.id} /> */}
        </div>
      ))}
    </div>
  );
};
export default TeamList;
