import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import ChatRoomClient from "./ChatRoomClient";

export default async function ChatRoomPage(props: any) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) redirect("/login");

    try {
        jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
        redirect("/login");
    }

    const { chatRoomId } = await props.params; 

    console.log("roomId:", chatRoomId);

    return <ChatRoomClient roomId={chatRoomId} />;
}