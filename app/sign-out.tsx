"use client";
import Image from "next/image";

type Props = {
  onSignOut: () => Promise<void>;
};

const SignOut = ({ onSignOut }: Props) => {
  return (
    <button
      onClick={() => {
        onSignOut();
      }}
    >
      <Image
        src="/images/exit.png"
        alt="退出登录"
        width={25}
        height={25}
        priority
        className="exit"
      />
    </button>
  );
};

export default SignOut;
