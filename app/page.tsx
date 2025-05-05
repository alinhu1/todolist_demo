import Fetch from "./components/Fetch";
import Create from "./components/Create";
import { getLogtoContext, signIn, signOut } from "@logto/next/server-actions";
import { logtoConfig } from "./logto";
import SignOut from "./sign-out";
import SignIn from "./sign-in";

import SearchUser from "./components/SearchUser";
import Request from "./components/Request";

import Image from "next/image";

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
        <Image
          src="/images/logo.png"
          alt="网站 Logo"
          width={30}
          height={30}
          priority
          className="logo"
        />
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
                await signIn(logtoConfig);
              }}
            />
          </p>
        )}
      </div>

      <div className="content">
        <Image
          src="/images/path.png"
          alt="path"
          width={15}
          height={15}
          priority
          className="path"
        />
        <h1>TODO LIST</h1>

        {claims?.sub == null ? null : <Create userId={claims?.sub} />}
        <ul>
          <Fetch currentUserId={claims?.sub || ""} />
        </ul>
        <SearchUser currentUserId={claims?.sub || ""} />
        <Request currentUserId={claims?.sub || ""} />
      </div>
    </div>
  );
}
