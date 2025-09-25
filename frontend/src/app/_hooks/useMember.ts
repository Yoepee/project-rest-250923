import client from "@/global/backend/client";

import { useRouter } from "next/navigation";

const useMember = () => {
  const router = useRouter();

  const logout = () => {
    client.DELETE(`/api/v1/members/logout`).then((res) => {
      if (res.error) {
        alert(res.error.msg);
        return;
      }

      alert(res.data.msg);
      router.replace(`/posts`);
    });
  };
  return { logout };
};

export default useMember;
