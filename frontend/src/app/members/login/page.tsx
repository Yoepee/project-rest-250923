"use client";

import withLogout from "@/global/auth/hoc/withLogout";
import { useAuthContext } from "@/global/auth/hooks/useAuth";
import client from "@/global/backend/client";

import { useRouter } from "next/navigation";

export default withLogout(function Page() {
  const { setLoginMember } = useAuthContext();
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const frontendBaseUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;
  const kakaoApiUrl = `${apiBaseUrl}/oauth2/authorization/kakao`;
  const redirectUrl = encodeURIComponent(`${frontendBaseUrl}/members/me`);
  const kakaoLoginUrl = `${kakaoApiUrl}${redirectUrl ? `?redirectUrl=${redirectUrl}` : ""}`;

  const getLoginUrl = (type: string) => {
    const apiUrl = `${apiBaseUrl}/oauth2/authorization/${type}`;
    const redirectUrl = encodeURIComponent(`${frontendBaseUrl}/members/me`);
    return `${apiUrl}${redirectUrl ? `?redirectUrl=${redirectUrl}` : ""}`;
  };

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const usernameInput = form.elements.namedItem(
      "username",
    ) as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      "password",
    ) as HTMLTextAreaElement;

    if (usernameInput.value.trim() === "" || usernameInput.value.length === 0) {
      alert("아이디를 입력해주세요.");
      usernameInput.focus();
      return;
    }

    if (passwordInput.value.trim() === "" || passwordInput.value.length === 0) {
      alert("비밀번호를 입력해주세요.");
      passwordInput.focus();
      return;
    }

    client
      .POST(`/api/v1/members/login`, {
        body: {
          username: usernameInput.value,
          password: passwordInput.value,
        },
      })
      .then((res) => {
        if (res.error) {
          alert(res.error.msg);
          return;
        }

        alert(res.data.msg);
        setLoginMember(res.data.data.item);
        router.replace(`/posts`);
      });
  };

  return (
    <>
      <h1>로그인</h1>
      <form className="flex flex-col gap-2 p-2" onSubmit={handleSumbit}>
        <input
          className="border p-2 rounded"
          type="text"
          name="username"
          placeholder="아이디를 입력하세요."
          autoFocus
        />
        <input
          className="border p-2 rounded"
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요."
          autoFocus
        />
        <button className="border p-2 rounded" type="submit">
          로그인
        </button>
        <button
          className="border p-2 rounded"
          type="button"
          onClick={() => {
            window.location.href = `${getLoginUrl("kakao")}`;
          }}
        >
          카카오 로그인
        </button>
        <button
          className="border p-2 rounded"
          type="button"
          onClick={() => {
            window.location.href = `${getLoginUrl("google")}`;
          }}
        >
          구글 로그인
        </button>
      </form>
    </>
  );
});
