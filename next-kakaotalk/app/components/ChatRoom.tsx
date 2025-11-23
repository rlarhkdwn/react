"use client";

interface ChatRoom {
    roomId: string;
    roomName: string;
    members: ChatRoomMember[];
}

interface ChatRoomMember {
    memberId: string;
    memberName: string;
}

export default function ChatRoom({
    chatRoom,
    myId,
}: {
    chatRoom: ChatRoom;
    myId: string | null;
}) {
    // 본인 제외한 유저 이름만 표시
    const otherMembers = chatRoom.members
        .filter((m) => m.memberId !== myId)
        .map((m) => m.memberName)
        .join(", ");

    const displayNames = otherMembers && otherMembers.length > 30
        ? otherMembers.slice(0, 30) + "..."
        : otherMembers;

    return (
        <div className="flex items-center pl-8 pr-8 pt-2 pb-2 hover:bg-gray-100 w-110 cursor-pointer">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                fill="currentColor"
                className="bi bi-person-circle mr-4"
                viewBox="0 0 16 16"
            >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
            </svg>

            <div>
                <p className="font-semibold text-lg">
                    {chatRoom.roomName ? chatRoom.roomName : displayNames}
                </p>

                <span className="ml-1 text-gray-600 text-sm inline-block max-w-[160px] truncate">
                    최근 메시지
                </span>
            </div>
        </div>
    );
}