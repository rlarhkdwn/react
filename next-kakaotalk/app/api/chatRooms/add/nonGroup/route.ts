import db from "@/app/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";
import { JWTPayload } from "@/app/type/type";

export async function POST(req: NextRequest) {
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

        const { targetId } = await req.json();

        // 1. 이미 1:1 채팅방이 존재하는지 확인
        const [exist]: any = await db.query(
            `
            SELECT c.id
            FROM chat_rooms c
            JOIN chat_room_members m1 ON c.id = m1.room_id
            JOIN chat_room_members m2 ON c.id = m2.room_id
            WHERE c.is_group = false
            AND m1.user_id = ?
            AND m2.user_id = ?
            `,
            [userId, targetId]
        );

        // 이미 존재하면 해당 room_id를 리턴하고 종료
        if (exist.length > 0) {
            const roomId = exist[0].id;
            return NextResponse.json({ roomId, created: false }); 
        }



        // 2. 존재하지 않으면 새 채팅방 생성
        const [result]: any = await db.query(
            `
            INSERT INTO chat_rooms (room_name, is_group)
            VALUES (?, false)
            `,
            [""]
        );

        const roomId = result.insertId;


        // 3. 멤버 등록 (나 + 상대)
        await db.query(
            `
            INSERT INTO chat_room_members (room_id, user_id)
            VALUES (?, ?), (?, ?)
            `,
            [roomId, userId, roomId, targetId]
        );

        return NextResponse.json({ roomId, created: true });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "서버 오류" },
            { status: 500 }
        );
    }
}