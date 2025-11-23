"use client";

import Message from "@/app/components/Message";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface ChatRoom {
    roomId: number;
    roomName: string;
    members: ChatRoomMember[];
}

interface ChatRoomMember {
    memberId: string;
    memberName: string;
}

interface MessageProps {
    sender_id: string;
    message: string;
    created_date: string;
    myId: string | null;
}

export default function ChatRoomClient({ roomId }: { roomId: string }) {
    const [myId, setMyId] = useState<string | null>(null);

    // 서버에서 내 userId 가져오기
    useEffect(() => {
        const loadMyId = async () => {
            try {
                const res = await fetch("/api/myId", {
                    method: "GET",
                    credentials: "include",
                });

                const data = await res.json();
                setMyId(data.userId);  // 서버에서 userId로 내려준다
            } catch (e) {
                console.error("myId 로딩 실패:", e);
            }
        };

        loadMyId();
    }, []);

    const [render, setRender] = useState(false); // 재랜더링용 변수

    const [roomInfo, setRoomInfo] = useState<ChatRoom | null>(null);
    useEffect(() => {
        const loadGroupInfo = async () => {
            try {
                const res = await fetch(`/api/chatRooms/loadGroupInfo/${roomId}`, {
                    method: "GET",
                    credentials: "include" // 쿠키 자동 전송
                });
        
                if (!res.ok) {
                    const result = await res.json()
                    console.error(result);
                    return;
                }
        
                const result : ChatRoom = await res.json();
                setRoomInfo(result);
            } catch (e) {
                console.error(e);
            }
        };
        loadGroupInfo();
    }, []);

    
    const otherMembers = roomInfo?.members
    ?.filter(m => m.memberId !== myId)   // 본인 제외
    ?.map(m => m.memberName)             // 이름만 추출
    ?.join(", ");                         // 쉼표로 연결

    const displayNames =
    otherMembers && otherMembers.length > 10
        ? otherMembers.slice(0, 10) + "..."
        : otherMembers;

    const [text, setText] = useState('');

    const onchange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setText(e.target.value);
    }

    const sendMessage = async () => {
        if (!text.trim()) return; // 빈 메시지 방지

        try {
            const res = await fetch(`/api/messages/add/${roomId}`, {
                method: "POST",
                credentials: "include",  // 쿠키 자동 포함 (로그인 유지)
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: text
                })
            });

            if (!res.ok) {
                const err = await res.json().catch(() => null);
                console.error("메시지 전송 실패:", err?.message || res.status);
                return;
            }

            const result = await res.json();
            console.log("메시지 전송 성공:", result);

            setText("");  // 입력칸 비우기

        } catch (error) {
            console.log("메시지 전송 중 오류:", error);
        }
    };

    const [messages, setMessages] = useState([]);
    useEffect(()=>{
        const loadMessage = async () => {
            try {
                console.log('메시지 조회중')
                const res = await fetch(`/api/messages/loadMessages/${roomId}`);
                if (!res.ok) {
                    const err = await res.json().catch(() => null);
                    console.error("메시지 조회 실패:", err?.message || res.status);
                    return;
                }

                const result = await res.json();
                
                setMessages(result.data)

            } catch (error) {
                console.log("메시지 조회 중 오류:", error);
            }
        };
        loadMessage();
    }, [render])

    // 항상 스크롤 아래로 내리기
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="relative w-[500px] h-[800px] mt-15 bg-blue-200 shadow-xl rounded-xl overflow-hidden flex flex-col items-center text-gray-900">
            <Link href={'/main'}>
                <button className="absolute top-3 right-3 text-gray-500 hover:text-black">
                    ✕
                </button>
            </Link>
            <div className="flex items-center w-full h-[100px] pt-8 pr-4 pl-4 pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/></svg>
                <div className="ml-4 text-xl">
                    <p>{roomInfo?.roomName ? roomInfo?.roomName : displayNames}</p> {/* 방제목있으면 표시 없으면 멤버 이름 */}
                </div>
            </div>
            <div className="bg-blue-200 w-full h-[580px] p-4 overflow-y-auto scrollbar-hide">
                {messages && (
                    messages.map((msg: MessageProps, idx) => {
                        return (
                            <Message
                                key={idx}
                                sender_id={msg.sender_id}
                                message={msg.message}
                                created_date={msg.created_date}
                                myId={myId}
                            />
                        );
                    })
                )}
                {/* 스크롤 내리는 용 */}
                <div ref={messagesEndRef} /> 
            </div>
            <textarea 
                className="bg-white w-full h-[120px] p-4 focus:border-none focus:outline-none"
                name="message"
                value={text}
                placeholder="메시지 입력"
                onChange={onchange}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();   // textarea 줄바꿈 방지
                        if (text){
                            sendMessage();    // 전송 함수 실행
                            setRender(!render);
                        } 
                    }
                }}
            ></textarea>
        </div>
    )
}