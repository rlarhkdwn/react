"use client"
import Link from "next/link";
import { useEffect, useState } from "react"

export default function Login(){
    const [inputs, setInputs] = useState({
        username:'',
        password:''
    });
    const { username, password } = inputs;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    // 로그인 버튼 클릭
    const onLogin = async () => {
        if (!username || !password) {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", // 쿠키 저장 옵션
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
    
            // 404 → 존재하지 않는 아이디
            if (response.status === 404) {
                alert("존재하지 않는 아이디입니다.");
                return;
            }
    
            // 401 → 비밀번호 불일치
            if (response.status === 401) {
                alert("비밀번호가 일치하지 않습니다.");
                return;
            }
    
            // 200 → 로그인 성공
            if (response.status === 200) {
                // 친구 목록 페이지로 이동
                window.location.href = "/main";
            }
    
        } catch (error) {
            console.error(error);
            alert("서버 오류가 발생했습니다.");
        }
    };

    // 자동 로그인 체크
    const checkAutoLogin = async () => {
        const res = await fetch("/api/users/autoLogin", {
            method: "GET",
            credentials: "include",  // 쿠키 자동 전송!!
        });

        const data = await res.json();

        if (data.loggedIn) {
            // 이미 로그인됨 → 바로 main 페이지로 이동
            window.location.href = "/main";
        }
    };

    useEffect(() => {
        checkAutoLogin();
    }, []);

    return(
        <div className="w-[500px] h-[800px] mt-15 bg-yellow-300 shadow-xl rounded-xl overflow-hidden flex flex-col items-center text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="bi bi-chat-fill mt-25" viewBox="0 0 16 16"><path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"/></svg>
            <div className="mt-20 border border-gray-200 overflow-hidden w-75">
                <input 
                    className="bg-white w-full p-3 border-b border-gray-100 outline-none"
                    type="text" 
                    name="username"
                    value={username}
                    onChange={onChange}
                    placeholder="카카오계정 (이메일 또는 전화번호)"
                />
                <input 
                    className="bg-white w-full p-3 outline-none"
                    type="password" 
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="비밀번호"
                />
            </div>
            <button
                className="bg-white w-75 p-3 border border-gray-200 rounded outline-none mt-3 p-3"
                onClick={onLogin}
            >로그인</button>
            <p className="m-5 text-sm">또는</p>
            <button
                className="bg-white w-75 p-3 border border-gray-200 rounded outline-none mt-3 p-3"
            >QR코드 로그인</button>
            <div className="mt-36 text-sm text-gray-500">
                <span><Link href={'/register'}>회원가입</Link></span> | <span>비밀번호 재설정</span>
            </div>
        </div>
    )
}