import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, props: any) {
    const params = await props.params; // 반드시 여기서 구조분해하기 (위의 매개변수 받는곳에서 구조분해시 promise객체로 바뀜)
    const roomId = params.roomId;

    try {
        const roomId = params.roomId;
        if (!roomId) {
            return NextResponse.json(
                { message: "roomId가 필요합니다." },
                { status: 400 }
            );
        }

        // DB 조회
        const [results]: any = await db.query(
            `
            SELECT 
                c.id AS room_id,
                c.room_name,
                u.id AS member_id,
                u.nickname AS member_name
            FROM chat_rooms c
            JOIN chat_room_members m ON c.id = m.room_id
            JOIN users u ON m.user_id = u.id
            WHERE c.id = ?
            ORDER BY u.nickname
            `,
            [roomId]
        );

        if (results.length === 0) {
            return NextResponse.json(
                { message: "해당 채팅방이 없습니다." },
                { status: 404 }
            );
        }

        // 구조화
        const room = {
            roomId: results[0].room_id,
            roomName: results[0].room_name,
            members: results.map((r: any) => ({
                memberId: r.member_id,
                memberName: r.member_name,
            })),
        };

        return NextResponse.json(room);

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "서버 오류" },
            { status: 500 }
        );
    }
}