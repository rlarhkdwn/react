import db from "@/app/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "로그인이 필요합니다." }, { status: 401 });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json({ message: "유효하지 않은 토큰입니다." }, { status: 401 });
        }

        const myId = decoded.id;

        // body로 username 전송됨
        const { username } = await req.json();

        // 1. username 존재하는지
        const [rows]: any = await db.query(
            "SELECT id FROM users WHERE username = ?",
            [username]
        );

        if (rows.length === 0) {
            return NextResponse.json({ message: "존재하지 않는 유저입니다." }, { status: 404 });
        }

        const targetId = rows[0].id;

        // 2. 본인인지 체크
        if (myId === targetId) {
            return NextResponse.json({ message: "본인에게 친구 요청을 보낼 수 없습니다." }, { status: 409 });
        }

        // 3. 이미 친구인지 확인
        const [existsFriend]: any = await db.query(
            "SELECT * FROM friends WHERE user_id = ? AND friend_id = ?",
            [myId, targetId]
        );

        if (existsFriend.length > 0) {
            return NextResponse.json({ message: "이미 친구 추가한 상태입니다." }, { status: 409 });
        }

        // 4. 친구 요청 삽입
        await db.query(
            "INSERT INTO friends (user_id, friend_id, state) VALUES (?, ?, 'pending')",
            [myId, targetId]
        );

        return NextResponse.json({ message: "친구 요청을 보냈습니다." }, { status: 200 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: "서버 오류" }, { status: 500 });
    }
}