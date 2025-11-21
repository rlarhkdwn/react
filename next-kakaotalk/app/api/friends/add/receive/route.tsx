import db from "@/app/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";

export async function GET(req: Request) {
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

        // 친구 신청 목록 조회 friend_id가 본인이고 state가 pending인 것만 조회
        const [nicknames] = await db.query(
            "SELECT u.nickname FROM friends f JOIN users u ON f.user_id = u.id WHERE f.friend_id = ? AND f.state = 'pending'",
            [myId]
        );
        
        return NextResponse.json(nicknames);
        
    } catch (e) {
        console.error(e); return NextResponse.json({ message: "서버 오류" }, { status: 500 }); 
    }
};