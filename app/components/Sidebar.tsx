"use client";

import { useFindManyTeam } from "@/generated/hooks";

interface Iprops {
    userId: string;
    activeView: string;
    setActiveView: (view: string) => void;
    selectedTeamId: string | null;
    setSelectedTeamId: (id: string | null) => void;
}
const Sidebar = (props: Iprops) => {
  const {
    userId,
    activeView,
    setActiveView,
    selectedTeamId,
    setSelectedTeamId,
  } = props;

  const { data: teams = [] } = useFindManyTeam({
    where: {
      OR: [
        { createdById: userId },
        { members: { some: { userId } } }
      ]
    }
  });


  return (
    <div>
        <div>
            <h3>个人代办</h3>
            <button
               className={`sidebar-item ${activeView === "my-todos" ? "active" : ""}`} 
            onClick={()=>setActiveView('my-todos')}>我的代办</button>
             <button
          className={`sidebar-item ${activeView === "shared-settings" ? "active" : ""}`}
          onClick={() => setActiveView("shared-settings")}
        >
          共享设置
        </button>
        <button
          className={`sidebar-item ${activeView === "shared-settings" ? "active" : ""}`}
          onClick={() => setActiveView("shared-settings")}
        >
          共享代办
        </button>
        </div>
        <div>
            <h3>团队空间</h3>
            <button
          className={`sidebar-item ${activeView === "create-team" ? "active" : ""}`}
          onClick={() => setActiveView("create-team")}
        >
          新建团队
        </button>
        {teams.map((team) => (
          <button
            key={team.id}
            className={`sidebar-item ${selectedTeamId === team.id ? "active" : ""}`}
            onClick={() => {
              setActiveView("team-detail");
              setSelectedTeamId(team.id);
            }}
          >
            {team.name}
          </button>
        ))}
        </div>
    </div>
  );
};

export default Sidebar;
