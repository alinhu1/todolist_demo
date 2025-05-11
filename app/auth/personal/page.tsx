import Create from "@/app/components/Create";
import Fetch from "@/app/components/Fetch";
import JoinTeamRequest from "@/app/components/JoinTeamRequest";
import SearchUser from "@/app/components/SearchUser";
import TeamManagement from "@/app/components/TeamManagement";
import { logtoConfig } from "@/app/logto";
import SignOut from "@/app/sign-out";
import { getLogtoContext, signOut } from "@logto/next/server-actions";
import Image from "next/image";
import Link from "next/link";
import Request from "@/app/components/Request";
import ShareTodo from "@/app/components/ShareTodo";
import TeamTodo from "@/app/components/TeamTodo";
import TeamRequests from "@/app/components/TeamRequests ";
import InviteForm from "@/app/components/InviteForm";

export interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

interface IProps {
  searchParams?: Promise<{
    view?: "my-todos" | "shared-settings" | "shared-todos";
    team?: string;
  }>;
}

export default async function PersonalPage(props: IProps) {
  const searchParams = await props.searchParams;
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
  const currentView = searchParams?.view || "my-todos";
  const selectedTeamId = searchParams?.team;

  console.log(isAuthenticated, claims);

  if (!isAuthenticated) {
    return <div>请先登录</div>;
  }

  const menuItems = [
    {
      id: "my-todos",
      label: "我的代办",
      icon: "/images/personal_todo.png",
      href: "/auth/personal",
    },
    {
      id: "shared-settings",
      label: "共享设置",
      icon: "/images/share.png",
      href: "/auth/personal?view=shared-settings",
    },
    {
      id: "shared-todos",
      label: "共享代办",
      icon: "/images/sharetodo.png",
      href: "/auth/personal?view=shared-todos",
    },
  ];

  return (
    <div className="personal-page">
      <div className="my-todos">
        <div className="logo">
          <span className="todos_logo">Todo List</span>
        </div>
        <div className="user-section">
          <SignOut
            onSignOut={async () => {
              "use server";
              await signOut(logtoConfig);
            }}
          />{" "}
          <Image
            src="/images/user.png"
            alt="用户"
            width={20}
            height={20}
            className="user-image"
          />
          <span className="user_name">{claims?.sub}</span>
        </div>
      </div>

      <div className="mytodos_banner">
        <div className="mytodos_left">
          <div className="left_top">
            <span className="title">个人代办</span>
            <br />
            <div className="menu-list">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`menu-item ${currentView === item.id ? "active" : ""}`}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={15}
                    height={15}
                    className="menu-icon"
                  />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <span className="title">团队空间</span>
            <div>
              <TeamManagement userId={claims?.sub || ""} />
            </div>
          </div>
        </div>

        <div className="mytodos_right">
          {selectedTeamId ? (
            <div className="team-content">
              <TeamTodo userId={claims?.sub || ""} teamId={selectedTeamId} />
              <InviteForm teamId={selectedTeamId} />
              <JoinTeamRequest userId={claims?.sub || ""} />
              <TeamRequests teamId={selectedTeamId} />
            </div>
          ) : (
            currentView === "my-todos" && (
              <>
                <h3>我的代办</h3>
                {claims?.sub == null ? null : <Create userId={claims?.sub} />}
                <Fetch currentUserId={claims?.sub || ""} />
              </>
            )
          )}

          {currentView === "shared-settings" && (
            <>
              <h3>共享设置</h3>
              <SearchUser currentUserId={claims?.sub || ""} />
              <Request currentUserId={claims?.sub || ""} />
            </>
          )}

          {currentView === "shared-todos" && (
            <>
              <h3>共享代办</h3>
              <ShareTodo currentUserId={claims?.sub || ""} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
