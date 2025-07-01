import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "/config/constants";

// https://apis.map.kakao.com/web/sample/coord2addr/
// 유저의 현재 위치로 행정동 주소 알아내기 (가입할때 당근처럼 진행)

export default function Signup() {
    const navigate = useNavigate();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const confirm = confirmRef.current.value;

        if (!username || !password || !confirm) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        if (password !== confirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            // 기존 사용자 중복 확인
            const check = await axios.get(`${URL.USERS}?username=${username}`);
            if (check.data.length > 0) {
                alert("이미 존재하는 아이디입니다.");
                return;
            }

            // 회원 등록 요청
            await axios.post(`${URL.USERS}`, { username, password });
            alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert("회원가입에 실패했습니다.");
        }
    };

    return (
        <div style={{ marginTop: "50px", textAlign: "center" }}>
  <h2 className="point">회원가입</h2>
  <form
    onSubmit={handleSubmit}
    style={{
      display: "inline-block",
      textAlign: "left",
      padding: "20px",
      border: "1px solid var(--gray-border-color)",
      borderRadius: "5px",
      backgroundColor: "#fff",
      maxWidth: "500px",
      width: "100%",
    }}
  >
    <div style={{ marginBottom: "10px" }}>
      <label>아이디</label><br />
      <input
        type="text"
        ref={usernameRef}
        placeholder="아이디를 입력하세요"
        style={{
          width: "100%",
          padding: "8px",
          boxSizing: "border-box",
          border: "1px solid var(--gray-border-color)",
          color: "var(--text-color)",
        }}
      />
    </div>

    <div style={{ marginBottom: "10px" }}>
      <label>비밀번호</label><br />
      <input
        type="password"
        ref={passwordRef}
        placeholder="비밀번호를 입력하세요"
        style={{
          width: "100%",
          padding: "8px",
          boxSizing: "border-box",
          border: "1px solid var(--gray-border-color)",
          color: "var(--text-color)",
        }}
      />
    </div>

    <div style={{ marginBottom: "10px" }}>
      <label>비밀번호 확인</label><br />
      <input
        type="password"
        ref={confirmRef}
        placeholder="비밀번호를 다시 입력하세요"
        style={{
          width: "100%",
          padding: "8px",
          boxSizing: "border-box",
          border: "1px solid var(--gray-border-color)",
          color: "var(--text-color)",
        }}
      />
    </div>

    <div style={{ textAlign: "center" }}>
      <button
        type="submit"
        style={{
          padding: "8px 20px",
          backgroundColor: "var(--point-color)",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        회원가입
      </button>
    </div>
  </form>

  <p style={{ marginTop: "10px" }}>
    이미 회원이신가요?{" "}
    <a href="/login" className="point" style={{ textDecoration: "none" }}>
      로그인
    </a>
  </p>
</div>);
}
