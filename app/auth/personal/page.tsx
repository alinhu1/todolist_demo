import Create from "@/app/components/Create";
import Fetch from "@/app/components/Fetch";
import JoinTeamRequest from "@/app/components/JoinTeamRequest";
import SearchUser from "@/app/components/SearchUser";
import TeamManagement from "@/app/components/TeamManagement";
import { logtoConfig } from "@/app/logto";
import SignOut from "@/app/sign-out";
import { getLogtoContext, signOut } from "@logto/next/server-actions";
import Image from "next/image";

export interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

export default async function PersonalPage() {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
  console.log(isAuthenticated, claims);

  if (!isAuthenticated) {
    return <div>请先登录</div>;
  }

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
            <div className="person">
              <Image
                src="/images/mytodo.png"
                alt="我的代办"
                width={15}
                height={15}
                priority
                className="picture"
              />{" "}
              <span>我的代办</span>
            </div>
            <div className="person2">
              <Image
                src="/images/share.png"
                alt="共享设置"
                width={15}
                height={15}
                priority
                className="picture"
              />{" "}
              <span>共享设置</span>
            </div>
            <div className="person2">
              <Image
                src="/images/sharetodo.png"
                alt="共享代办"
                width={15}
                height={15}
                priority
                className="picture"
              />{" "}
              <span>共享代办</span>
            </div>
          </div>

          <div >
            <span className="title">团队空间</span>
            <div>
            <TeamManagement userId={claims?.sub || ""} />
            </div>

          </div>
        </div>


        <div className="mytodos_right">
          <h3>我的代办</h3>
          {claims?.sub == null ? null : <Create userId={claims?.sub} />}
         
        <Fetch currentUserId={claims?.sub || ""} />
    
        </div>
      </div>

      {/* {claims?.sub == null ? null : <Create userId={claims?.sub} />} */}
      {/* <ul>
        <Fetch currentUserId={claims?.sub || ""} />
      </ul> */}
      <SearchUser currentUserId={claims?.sub || ""} />
      {/* <Request currentUserId={claims?.sub || ""} /> */}
      {/* <TeamManagement userId={claims?.sub || ""} /> */}
      <JoinTeamRequest userId={claims?.sub || ""} />
    </div>
  );
}
