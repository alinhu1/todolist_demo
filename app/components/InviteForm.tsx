"use client";

import { useCreateTeamMember, useFindManyUser } from "@/generated/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Iprops {
  teamId: string;
}

const InviteForm = (props: Iprops) => {
  const { teamId } = props;
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState("");

  const { data: users } = useFindManyUser();

  const { mutate: createMember } = useCreateTeamMember({
    meta: {
      readResult: false,
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
      setUserId("");
      console.log("成功邀请成员");
    },
  });

  const handleInvite = () => {
    if (!userId.trim()) {
      alert("请输入用户ID");
      return;
    }

    if (!users?.some((user) => user.id === userId)) {
      alert("用户不存在");
      return;
    }

    createMember({
      data: {
        teamId: teamId,
        userId: userId,
        role: "MEMBER",
      },
    });
  };

  return (
    <div className="invite_form">
      <h5>邀请成员</h5>
      <input
        type="text"
        placeholder="  输入用户ID"
        className="invite_input"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleInvite}>邀请成员</button>
    </div>
  );
};

export default InviteForm;
