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
        width={20}
        height={20}
        priority
        className="exit"
      />
    </button>
  );
};

export default SignOut;
