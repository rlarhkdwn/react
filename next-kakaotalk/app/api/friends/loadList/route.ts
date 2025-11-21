import db from "@/app/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";
import { JWTPayload } from "@/app/type/type";

export async function GET() {
    try {
        // 1. 쿠키에서 JWT 꺼내기
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "로그인이 필요합니다." },
                { status: 401 }
            );
        }

        // 2. JWT 검증
        const decoded: JWTPayload = verifyToken(token);

        if (!decoded) {
            return NextResponse.json(
                { message: "유효하지 않은 토큰입니다." },
                { status: 401 }
            );
        }

        const userId = decoded.id; // ← JWT에 넣어둔 값

        // 3. DB에서 친구 목록 가져오기
        const [nicknames]: any = await db.query(
            "SELECT u.nickname FROM friends f join users u on f.friend_id = u.id WHERE f.user_id = ? ORDER BY u.nickname",
            [userId]
        );

        return NextResponse.json(nicknames);

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "서버 오류" },
            { status: 500 }
        );
    }
}