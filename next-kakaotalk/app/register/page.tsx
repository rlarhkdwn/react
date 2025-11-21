"use client"

import Link from "next/link";
import { useState } from "react";

export default function Register(){
    const [inputs, setInputs] = useState({
        username:'',
        nickname:'',
        password:'',
        checkPassword:''
    });
    const { username, nickname, password, checkPassword } = inputs;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const onRegister = async ()=>{
        try {
            const response = await fetch(`/api/users/register/${username}`);
            
            if (response.status === 200) {
                const pwRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
                if (!pwRegex.test(password)) {
                    alert("비밀번호는 영어, 숫자를 반드시 포함하며 8자 이상이어야 합니다.");
                    return;
                }

                if (password !== checkPassword) {
                    alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
                    return;
                }

                // 모두 통과시 users에 삽입 후 이동
                try {
                    await fetch('/api/users/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({username: username, nickname: nickname, password: password})
                    });
                } catch (error) {
                    console.log(error);
                }

                alert('회원가입이 완료되었습니다.');
                window.location.href = '/login'
            } else if (response.status === 409) {
                alert('중복되는 아이디입니다.')
            } else {
                console.log("알 수 없는 상태", response.status);
            }
        } catch (e) {
            console.log(e);
        }
    }

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
                    placeholder="아이디 (이메일 또는 전화번호)"
                />
                <input 
                    className="bg-white w-full p-3 border-b border-gray-100 outline-none"
                    type="text" 
                    name="nickname"
                    value={nickname}
                    onChange={onChange}
                    placeholder="닉네임"
                />
                <input 
                    className="bg-white w-full p-3 outline-none"
                    type="password" 
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="비밀번호"
                />
                <input 
                    className="bg-white w-full p-3 outline-none"
                    type="password" 
                    name="checkPassword"
                    value={checkPassword}
                    onChange={onChange}
                    placeholder="비밀번호 확인"
                />
            </div>
            <button
                className="bg-white w-75 p-3 border border-gray-200 rounded outline-none mt-3 p-3"
                onClick={onRegister}
            >회원가입</button>
            <div className="mt-42 text-sm text-gray-500">
                <span><Link href={'/login'}>로그인</Link></span> | <span>비밀번호 재설정</span>
            </div>
        </div>
    )
}