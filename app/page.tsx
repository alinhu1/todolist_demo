

import Fetch from "./components/Fetch";
import Create from "./components/Create";
import { getLogtoContext, signIn, signOut } from "@logto/next/server-actions";
import { logtoConfig } from "./logto";
import SignOut from "./sign-out";
import SignIn from "./sign-in";



export interface Todo {
  id: number,
  name: string,
  completed: boolean
}

export default async function Home(){
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
  return (
    <div className="content">
      <h1>TODO LIST</h1>
      {isAuthenticated ? (
        <p>
          Hello, {claims?.sub},
          <SignOut
            onSignOut={async () => {
              'use server';

              await signOut(logtoConfig);
            }}
          />
        </p>
      ) : (
        <p>
          <SignIn
            onSignIn={async () => {
              'use server';

              await signIn(logtoConfig);
            }}
          />
        </p>
      )}
      <Create />
      <ul>
      <Fetch />
      </ul>
      
    </div>
  )
}
