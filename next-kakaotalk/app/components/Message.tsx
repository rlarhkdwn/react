interface MessageProps {
    sender_id: string;
    message: string;
    created_date: string;
    myId: string | null;
}

export default function Message({ sender_id, message, created_date, myId }: MessageProps) {
    const isMe = sender_id === myId;

    const time = created_date.slice(11, 16);

    return (
        <div className={`flex ${isMe ? "justify-end" : "justify-start"} my-2 items-end`}>
            {isMe && (
                <span className="text-xs text-gray-500 block mb-1 mr-2">
                    {time}
                </span>
            )}
            <div 
                className={`px-3 py-2 rounded-lg max-w-[70%] 
                    ${isMe ? "bg-yellow-300" : "bg-gray-200"}`}
            >
                <p className="text-lg">{message}</p>
            </div>
            {!isMe && (
                <span className="text-xs text-gray-500 block mt-1 text-right ml-2">
                    {time}
                </span>
            )}
        </div>
    );
}