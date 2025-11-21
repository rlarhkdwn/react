import { useState } from "react";

export default function AddFriend() {    // 친구추가 api
    const addFriend = async ()=>{
        if (!input.trim()) return;

        try {
            const res = await fetch("/api/friends/add/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username: input }),
            });

            if (res.status === 404) {
                alert("해당 아이디의 회원이 없습니다.");
                return;
            }

            if (res.status === 409) {
                const data = await res.json(); // ← 메시지를 꺼내야 함
                alert(data.message);
                return;
            }

            if (res.ok) {
                alert("친구 요청을 보냈습니다.");
            }

        } catch (err) {
            console.error(err);
            alert("서버 오류가 발생했습니다.");
        }
    }

    // 입력
    const [input, setInput] = useState('');

    return (
        <div>
            <input 
                className="pl-8 pr-8 pt-12 text-lg outline-none focus:outline-none border-none focus:border-none" 
                type="text"
                name="id"
                value={input}
                onChange={(e)=>{setInput(e.target.value)}}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        addFriend();
                    }
                }}
            />
            <p className="text-sm font-light text-gray-500 ml-8 mr-8 pt-4 border-t-1 border-black">
                카카오톡 ID를 등록하고 검색을 허용한 친구만 찾을 수 있습니다.
            </p>
        </div>
    )
}