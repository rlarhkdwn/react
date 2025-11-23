export default function Friend({
    id,
    nickname,
    onClick,
    selected = false,
}: {
    id: string;
    nickname: string;
    onClick: (id: string, nickname: string) => void;
    selected?: boolean;
}) {
    return (
        <div
            className={`flex items-center pl-8 pr-8 pt-2 pb-2 w-full cursor-pointer
                ${selected ? "bg-blue-100" : "hover:bg-gray-100"}`}
            onClick={() => onClick(id, nickname)}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
            >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
            </svg>
            <span className="ml-5 text-2xl">{nickname}</span>
        </div>
    );
}