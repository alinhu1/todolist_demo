"use client";

type Props = {
  onSignIn: () => Promise<void>;
};

const SignIn = ({ onSignIn }: Props) => {
  return (
    <button
      onClick={() => {
        onSignIn();
      }}
    >
      <span className="sign-in">登录</span>
    </button>
  );
};

export default SignIn;
