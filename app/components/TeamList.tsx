"use client";

import { useFindManyTeam } from "@/generated/hooks";

import Image from "next/image";
import Link from "next/link";

interface Iprops {
  userId: string;
  selectedTeamId?: string;
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
        <Link
          key={team.id}
          href={`/auth/personal?team=${team.id}`}
          className={`teamname ${props.selectedTeamId === team.id ? "active" : ""}`}
        >
          <div className="team_name">{team.name}</div>
          <span className="space">{}</span>
          <Image
            src="/images/ellipsis.png"
            alt="省略号"
            width={20}
            height={20}
            priority
            className="ellipsis"
          />
        </Link>
      ))}
    </div>
  );
};
export default TeamList;
