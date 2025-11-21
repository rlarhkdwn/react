import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MainClient from "./MainClient";
import jwt from "jsonwebtoken";

export default async function FriendsPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/login");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        console.log("서버에서 인증 성공:", decoded);
    } catch (e) {
        console.log("토큰 검증 실패:", e);
        redirect("/login");
    }

    return <MainClient />;
}