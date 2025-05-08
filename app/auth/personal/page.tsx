import Create from "@/app/components/Create";
import Fetch from "@/app/components/Fetch";
import JoinTeamRequest from "@/app/components/JoinTeamRequest";
import SearchUser from "@/app/components/SearchUser";
import TeamManagement from "@/app/components/TeamManagement";
import { logtoConfig } from "@/app/logto";
import SignOut from "@/app/sign-out";
import { getLogtoContext, signOut } from "@logto/next/server-actions";


export interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

export default async function PersonalPage() {
  const {isAuthenticated,claims } = await getLogtoContext(logtoConfig);
  console.log(isAuthenticated,claims);
  
  if (!isAuthenticated) {
    return <div>请先登录</div>;
  }

  return (
    <div className="personal-page">
      <span>Todo List</span>
      {/* <div>
        <Image
        alt="/images/exit.png"
        src="退出"
        width={20}
        height={20}
        priority/>
      </div> */}
      Hello, {claims?.sub}!{" "}
      <SignOut
        onSignOut={async () => {
          "use server";

          await signOut(logtoConfig);
        }}
      />
      {claims?.sub == null ? null : <Create userId={claims?.sub} />}
      <ul>
        <Fetch currentUserId={claims?.sub || ""} />
      </ul>
      <SearchUser currentUserId={claims?.sub || ""} />
      {/* <Request currentUserId={claims?.sub || ""} /> */}
      <TeamManagement userId={claims?.sub || ""} />
      <JoinTeamRequest userId={claims?.sub || ""} />
    </div>
  );
}
