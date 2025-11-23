import { verifyToken } from "@/app/lib/auth";
import db from "@/app/lib/db";
import { JWTPayload } from "@/app/type/type";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request, props: any) {
    try {
        const params = await props.params; // 반드시 여기서 구조분해하기 (위의 매개변수 받는곳에서 구조분해시 promise객체로 바뀜)
        const roomId = params.roomId;

        const body = await req.json();
        const { text } = body;

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
        await db.query(`
            INSERT INTO messages (room_id, sender_id, message) VALUES (?, ?, ?)
        `, [roomId, userId, text])
        
        return NextResponse.json(
            { message: "메시지 입력 성공" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "서버 오류" },
            { status: 500 }
        );
    }
}