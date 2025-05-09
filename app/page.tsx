import Fetch from "./components/Fetch";
import Create from "./components/Create";
import { getLogtoContext, signIn, signOut } from "@logto/next/server-actions";
import { logtoConfig } from "./logto";
import SignOut from "./sign-out";
import SignIn from "./sign-in";

import SearchUser from "./components/SearchUser";
import Request from "./components/Request";

import Image from "next/image";
import TeamManagement from "./components/TeamManagement";
import JoinTeamRequest from "./components/JoinTeamRequest";


export interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

export default async function Home() {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
  return (
    <div className="all">
      <div className="nav rounded-[15px]">
        <div className="nav_left">
          <Image
            src="/images/icon.png"
            alt="网站 icon"
            width={20}
            height={20}
            priority
            className="icon"
          />
          <span>TodoFlow</span>
        </div>
        <div className="nav_right">
          {isAuthenticated ? (
            <div className="text-white">
              Hello, {claims?.sub}!
              <SignOut
                onSignOut={async () => {
                  "use server";

                  await signOut(logtoConfig);
                }}
              />
            </div>
          ) : (
            <p>
              <SignIn
                onSignIn={async () => {
                  "use server";
                   await signIn(logtoConfig,{redirectUri:"http://localhost:3000/auth/personal"});
                }}
              />
            </p>
          )}
          <Image
            src="/images/head.png"
            alt="头像"
            width={30}
            height={30}
            priority
            className="head"
          />
        </div>
      </div>

      <div className="content">
        <div className="content_nav">
          <h3>TODO LIST</h3>
          <span>高效管理您的每日任务</span>
        </div>

        <div className="banner_top">
          <p>我的代办事项</p>
          <Image
            src="/images/status1.png"
            alt="状态条1"
            width={580}
            height={8}
            priority
          />
          <p>共享的代办事项</p>
          <Image
            src="/images/status2.png"
            alt="状态条1"
            width={720}
            height={8}
            priority
          />
          <span>还有0个未完成</span>
        </div>

        <div className="banner">
          <div className="banner_row">
            <div className="banner_left">
              <div className="banner_content">
                <Image
                  src="/images/sent_request.png"
                  alt="发送请求"
                  width={25}
                  height={25}
                  priority
                />
                <p>发送访问请求</p>
                <span>向其他用户发送访问邀请</span>
              </div>
            </div>
            <div className="banner_right">
              <div className="banner_content">
                <Image
                  src="/images/message.png"
                  alt="可选留言"
                  width={25}
                  height={25}
                  priority
                />
                <p>可选留言</p>
                <span>添加备注信息</span>
              </div>
            </div>
          </div>
          <div className="banner_row">
            <div className="banner_left">
              <div className="banner_content">
                <Image
                  src="/images/request.png"
                  alt="请求访问"
                  width={20}
                  height={20}
                  priority
                />
                <p>待处理的请求访问</p>
                <span>查看待处理的访问申请</span>
              </div>
            </div>
            <div className="banner_right">
              <div className="banner_content">
                <Image
                  src="/images/no_request.png"
                  alt="无请求"
                  width={20}
                  height={20}
                  priority
                />
                <p>暂无新请求</p>
                <span>目前没有新的请求</span>
              </div>
            </div>
          </div>
          <div className="banner_row">
            <div className="banner_left">
              <div className="banner_content">
                <Image
                  src="/images/team.png"
                  alt="团队管理"
                  width={25}
                  height={25}
                  priority
                />
                <p>团队管理</p>
                <span>管理您的团队成员</span>
              </div>
            </div>
            <div className="banner_right">
              <div className="banner_content">
                <Image
                  src="/images/add.png"
                  alt="加入团队"
                  width={25}
                  height={25}
                  priority
                />
                <p>创建/加入团队</p>
                <span>创建新团队或加入已有团队</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <span className="status-box complete">全部</span>
          <span className="status-box">未完成</span>
          <span className="status-box">已完成</span>
        </div>

        {claims?.sub == null ? null : <Create userId={claims?.sub} />}
        <ul>
          <Fetch currentUserId={claims?.sub || ""} />
        </ul>
        <SearchUser currentUserId={claims?.sub || ""} />
        <Request currentUserId={claims?.sub || ""} />
        <TeamManagement userId={claims?.sub || ""} />
        <JoinTeamRequest userId={claims?.sub || ""} />
      </div>
    </div>
  );
}