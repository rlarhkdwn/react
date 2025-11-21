import { useEffect, useState } from "react";
import Friend from "./Friend";
interface Friend {
    nickname: string;
}
export default function ReceivedFriendList() {
    const [list, setList] = useState<Friend[]>([]);

    useEffect(() => {
        const loadList = async ()=>{
            try {
                const res = await fetch("/api/friends/add/receive", {
                    method: "GET",
                    credentials: "include" // 쿠키 자동 전송
                });
        
                if (!res.ok) {
                    console.error("친구 목록 불러오기 실패");
                    return;
                }
        
                const nicknames = await res.json();
                setList(nicknames);
            } catch (e) {
                console.error(e);
            }
        }
        loadList();
    }, []);

    return (
        <div>
            {
                list.map((f, idx)=>(
                    <div key={idx} className="flex items-center pl-8 pr-8 pt-2 pb-2 w-100 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/></svg>
                        <span className="ml-5 text-2xl">{f.nickname}</span>
                        <span className="ml-22 text-lg pl-1 pr-2 pt-1 border-1 hover:bg-yellow-400">수락</span>
                        <span className="ml-2 text-lg pl-1 pr-2 pt-1 border-1 hover:bg-yellow-400">거절</span>
                    </div>
                ))
            }
        </div>
    )
}