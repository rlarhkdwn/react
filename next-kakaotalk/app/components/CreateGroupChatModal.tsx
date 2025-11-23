"use client";

export default function CreateGroupChatModal({
    onClose,
    onApprove,
    children
}: {
    onClose: () => void;
    onApprove: () => void;
    children: React.ReactNode;
}) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[350px] rounded-xl shadow-lg overflow-hidden relative w-[450px] h-[700px]">
                
                {/* 닫기 버튼 */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                    ✕
                </button>

                {children}

                <div className="flex justify-center p-6">
                    <button
                        onClick={onApprove}
                        className="bg-gray-300 pt-2 pb-2 pr-4 pl-4 hover:bg-yellow-400"
                    >확인</button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 pt-2 pb-2 pr-4 pl-4 ml-4 hover:bg-yellow-400"
                    >취소</button>
                </div>
            </div>
        </div>
    );
}