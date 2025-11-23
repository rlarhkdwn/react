"use client";
import { useState, useEffect } from "react";
import Friend from "../components/Friend";
import AddFriendModal from "../components/AddFriendModal";
import AddFriend from "../components/AddFriend";
import ReceivedFriendList from "../components/ReceivedFriendList";
import ChatRoom from "../components/ChatRoom";
import CreateGroupChatModal from "../components/CreateGroupChatModal";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MainClient() {
    const router = useRouter();

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

    const [selected, setSelected] = useState<"friends" | "chat" | "etc" | null>("friends");

    // 로그아웃
    const onLogout = async () => {
        try {
            const res = await fetch("/api/users/logout", {
                method: "POST",
                credentials: "include",
            });
            if (res.ok) window.location.href = "/login";
        } catch (e) {
            console.error(e);
        }
    };

    // 친구 추가
    const [addFriendModal, setAddFriendModal] = useState(false);
    
    // 모달 생성함수
    const Modal = ()=>{
        setAddFriendModal(true);
    }

    const [addMode, setAddMode] = useState<"contact" | "id" | "received" | null>("contact");


    // 자식 변화시 부모 재랜더링용 변수
    const [reload, setReload] = useState(false);

    const handleSuccess = () => {
        setReload(prev => !prev); // 상태 변경 → 부모 재렌더링
    };

    // 친구목록 데이터 불러오기
    interface Friend {
        id: string,
        nickname: string;
    }

    const [friends, setFriends] = useState<Friend[]>([]);
    const [friendLoading, setFriendLoading] = useState(false);
    
    // selected가 friends일 때 친구 목록 자동 호출
    useEffect(() => {
        if (selected === "friends") {
            const fetchFriends = async () => {
                try {
                    setFriendLoading(true);
            
                    const res = await fetch("/api/friends/loadList", {
                        method: "GET",
                        credentials: "include" // 쿠키 자동 전송
                    });
            
                    if (!res.ok) {
                        console.error("친구 목록 불러오기 실패");
                        return;
                    }
            
                    const nicknames = await res.json();
                    setFriends(nicknames);
            
                } catch (e) {
                    console.error(e);
                } finally {
                    setFriendLoading(false);
                }
            };
            fetchFriends();
        }
    }, [selected, reload]);

    // 친구목록 데이터 불러오기
    interface ChatRoom {
        roomId: string;
        roomName: string;
        members: ChatRoomMember[];
    }

    interface ChatRoomMember {
        memberId: string;
        memberName: string;
    }

    type ChatRoomResponse = ChatRoom[];

    // 채팅목록 불러오기
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [chatRoomLoading, setChatRoomLoading] = useState(false);
    
    // selected가 chat일 때 채팅 목록 자동 호출
    useEffect(() => {
        if (selected === "chat") {
            const fetchChatRooms = async () => {
                try {
                    setChatRoomLoading(true);
            
                    const res = await fetch("/api/chatRooms/loadList", {
                        method: "GET",
                        credentials: "include" // 쿠키 자동 전송
                    });
            
                    if (!res.ok) {
                        console.error("채팅 목록 불러오기 실패");
                        return;
                    }
            
                    const result : ChatRoomResponse = await res.json();
                    setChatRooms(result);
            
                } catch (e) {
                    console.error(e);
                } finally {
                    setChatRoomLoading(false);
                }
            };
            fetchChatRooms();
        }
    }, [selected, reload]);


    // 친구 상세 모달
    const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
    const [friendDetailModal, setFriendDetailModal] = useState(false);

    // Friend 클릭 시 실행될 함수
    const openFriendModal = (id: string, nickname: string) => {
        setSelectedFriend({id, nickname}); // 어떤 친구인지 저장
        setFriendDetailModal(true);   // 모달 열기
    };

    // 모달 닫기
    const closeFriendModal = () => {
        setFriendDetailModal(false);
        setSelectedFriend(null);
    };


    // onChat 채팅방 생성 및 이동
    const onChat = async (targetId: string | undefined)=>{
        try {
            const res = await fetch("/api/chatRooms/add/nonGroup", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    targetId: targetId
                }),
            });
    
            if (!res.ok) {
                const errorBody = await res.json().catch(() => null); // JSON 실패 대비
                console.error("채팅방 입장 오류:", errorBody?.message || "서버 응답 없음");
                return;
            }

            // 모달 닫고 채팅 페이지 이동
            closeFriendModal();
            const result = await res.json();
            router.push(`/chatRoom/${result.roomId}`);

        } catch (e) {
            console.error(e);
        }
    }

    // 그룹 채팅 생성 모달
    const [createGroupModal, setCreateGroupModal] = useState(false);

    // 선택된 친구 리스트
    const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

    // 클릭 시 toggle
    const toggleFriend = (id: string, _: string) => {
        setSelectedFriends(prev => 
            prev.includes(id)
                ? prev.filter(v => v !== id) // 이미 있으면 제거
                : [...prev, id]              // 없으면 추가
        );
    };

    // 단채 채팅방 만들기
    const onApprove = async () => {
        if (selectedFriends.length < 1) {
            alert("그룹 채팅은 최소 1명 이상을 선택해야 합니다.");
            return;
        }

        try {
            const res = await fetch("/api/chatRooms/add/group", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    members: selectedFriends
                }),
            });

            if (!res.ok) {
                const errorBody = await res.json().catch(() => null);
                console.error("그룹채팅 생성 오류:", errorBody?.message || "");
                alert("그룹채팅 생성 중 오류가 발생했습니다.");
                return;
            }

            const result = await res.json();
            console.log("그룹 채팅 생성 완료:", result);

            // 모달 닫기 + 선택 초기화
            setCreateGroupModal(false);
            setSelectedFriends([]);

            // 목록 새로고침
            setReload(prev => !prev);

            // 채팅방 이동
            console.log(result.roomId, 1)
            router.push(`/chatRoom/${result.roomId}`);

        } catch (e) {
            console.error(e);
        }
    }
    

    return(
        <div className="relative w-[500px] h-[800px] mt-15 bg-white shadow-xl rounded-xl overflow-hidden flex flex-col items-center text-gray-900">
            <div className="absolute left-0 top-0 bottom-0 bg-gray-200 w-20 flex flex-col items-center">
                <svg onClick={() => setSelected("friends")} xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className={`mt-14 cursor-pointer ${selected === "friends" ? "fill-black" : "fill-gray-400"}`} viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>
                <svg onClick={() => setSelected("chat")} xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className={`mt-10 cursor-pointer ${selected === "chat" ? "fill-black" : "fill-gray-400"}`} viewBox="0 0 16 16"><path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-three-dots mt-10 fill-gray-400" viewBox="0 0 16 16"><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-emoji-smile mt-90 fill-gray-400" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bell mt-8 fill-gray-400" viewBox="0 0 16 16"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/></svg>
                <svg onClick={onLogout} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-gear mt-8 fill-gray-400" viewBox="0 0 16 16"><path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/><path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/></svg>
            </div>
            {selected === "friends" && (
                <div>
                    <div className="absolute left-20 top-0 bottom-0 flex justify-between w-[420px] h-[80px] mt-14 text-3xl p-6 font-bold ">
                        <span>친구</span>
                        <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>
                            <svg onClick={Modal} xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="currentColor" className="bi bi-person-plus ml-5 -translate-y-[5px]" viewBox="0 0 16 16"><path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/><path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/></svg>
                        </div>
                        {addFriendModal && (  // 친구 추가 모달
                            <AddFriendModal onClose={() => setAddFriendModal(false)}>
                                <div className="border-b-1 border-gray-300">
                                    <h2 className="text-2xl font-bold mt-5 p-8 pb-4">친구 추가</h2>
                                    <span onClick={() => setAddMode("contact")} className={`text-sm pl-8 pr-8 inline-block mb-2 cursor-pointer ${addMode === "contact" ? "text-black font-bold" : "text-gray-500 font-light"}`}>연락처로 추가</span>
                                    <span onClick={() => setAddMode("id")} className={`text-sm pr-8 inline-block mb-2 cursor-pointer ${addMode === "id" ? "text-black font-bold" : "text-gray-500 font-light"}`}>ID로 추가</span>
                                    <span onClick={() => setAddMode("received")} className={`text-sm inline-block mb-2 cursor-pointer ${addMode === "received" ? "text-black font-bold" : "text-gray-500 font-light"}`}>받은 친구신청</span>
                                </div>
                                {addMode === "id" && ( // id로 추가 클릭시
                                    <AddFriend handleSuccess={handleSuccess}/>
                                )}
                                {addMode === "received" && ( // 받은 친구 신청 클릭시
                                    <ReceivedFriendList handleSuccess={handleSuccess} />
                                )}
                            </AddFriendModal>
                        )}
                    </div>

                    {friendLoading && <p>불러오는 중...</p>}
                    <div className="absolute left-20 top-30 bottom-0 pt-8 pb-8 w-105 overflow-y-auto scrollbar-hide">
                        {!friendLoading && friends.map((f, idx) => (
                            <div key={idx}>
                                <Friend 
                                    id={f.id}
                                    nickname={f.nickname} 
                                    onClick={() => openFriendModal(f.id, f.nickname)} 
                                />
                            </div>
                        ))}
                    </div>
                    {friendDetailModal && (
                    <div className="fixed inset-0 bg-black/10 flex items-center justify-center">
                        <div className="relative bg-gray-400 p-6 rounded-xl w-[400px] h-[600px] text-center text-black">
                            <svg onClick={closeFriendModal} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x absolute top-2 right-2" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>
                            <div className="absolute left-10 bottom-30 text-left">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/></svg>
                                <p className="text-3xl mt-2">{selectedFriend?.nickname}</p>
                                <p className="text-xl" >상태메시지</p>
                            </div>
                            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex justify-around w-[330px] border-2 border-gray-500 rounded-lg p-2 bg-gray-600">
                                <div onClick={()=>onChat(selectedFriend?.id)} className="flex justify-between">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chat-fill fill-white" viewBox="0 0 16 16"><path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"/></svg>
                                    <span className="text-xl ml-2 text-white">1:1 채팅</span>
                                </div>
                                <div className="text-gray-500">|</div>
                                <div className="flex justify-between pr-4 pl-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-telephone-fill fill-white" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/></svg>
                                    <span className="text-xl ml-2 text-white">통화</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                </div>                
            )}
            {selected === "chat" && (
                <div>
                    <div className="absolute left-20 top-0 bottom-0 flex justify-between w-[420px] h-[80px] mt-14 text-3xl p-6 font-bold ">
                        <span>채팅</span>
                        <div className="flex">
                            <svg onClick={() => setCreateGroupModal(true)} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-chat mr-3" viewBox="0 0 16 16"><path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/></svg>
                        </div>
                    </div>
                    {createGroupModal && (
                        <CreateGroupChatModal 
                            onClose={() => {
                                setCreateGroupModal(false); 
                                setSelectedFriends([]);
                            }}
                            onApprove={onApprove}>
                            <div className="p-5">
                                <h2 className="text-xl font-bold mb-4">대화상대 선택</h2>
                                <p className="text-gray-600 text-sm">친구</p>
                                <div className="mt-2 max-h-[500px] overflow-y-auto pr-2">
                                    {friends.map((f, idx) => (
                                        <div key={idx}>
                                            <Friend
                                                id={f.id}
                                                nickname={f.nickname}
                                                onClick={() => toggleFriend(f.id, f.nickname)}
                                                selected={selectedFriends.includes(f.id)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CreateGroupChatModal>
                    )}
                    {chatRoomLoading && <p>불러오는 중...</p>}
                    <div className="absolute left-20 top-30 bottom-0 pt-8 pb-8 overflow-y-auto scrollbar-hide">
                        {!chatRoomLoading && chatRooms.map((c, idx) => (
                            <Link key={idx} href={`/chatRoom/${c.roomId}`}>
                                <div>
                                    <ChatRoom myId={myId} chatRoom={c} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}