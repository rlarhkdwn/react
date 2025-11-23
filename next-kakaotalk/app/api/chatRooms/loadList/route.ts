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

        // 3. DB에서 채팅 목록 가져오기
        const [results] = await db.query(
            `
            SELECT 
                c.id as room_id,
                c.room_name,
                u.id AS member_id,
                u.nickname AS member_name
            FROM chat_rooms c
            JOIN chat_room_members m ON c.id = m.room_id
            JOIN users u ON m.user_id = u.id
            WHERE c.id IN (
                SELECT room_id 
                FROM chat_room_members 
                WHERE user_id = ?
            )
            ORDER BY c.used_date DESC
            `,
            [userId]
        );

        const rooms: any = {};

        (results as any[]).forEach(row => {
            const roomId = row.room_id;

            if (!rooms[roomId]) {
                rooms[roomId] = {
                    roomId: row.room_id,
                    roomName: row.room_name,
                    members: []
                };
            }

            rooms[roomId].members.push({
                memberId: row.member_id,
                memberName: row.member_name
            });
        });

        return NextResponse.json(Object.values(rooms));

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "서버 오류" },
            { status: 500 }
        );
    }
}