import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";
import { JWTPayload } from "@/app/type/type";

export async function POST(req: Request) {
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

        const myId = decoded.id; // ← JWT에 넣어둔 값

        const { members } = await req.json();

        // 1. 배열인지 확인
        if (!Array.isArray(members) || members.length < 2) {
            return NextResponse.json(
                { message: "최소 2명 이상 선택해야 그룹 채팅 생성 가능합니다." },
                { status: 400 }
            );
        }

        // 2. groupRoom 생성
        const [roomResult]: any = await db.query(
            `
            INSERT INTO chat_rooms (room_name, is_group)
            VALUES (?, true)
            `,
            [""] // 방 이름은 일단 빈 값으로. 나중에 확장
        );

        const roomId = roomResult.insertId;

        // 3. 모든 멤버 + 나까지 포함
        const allMembers = [...members, myId];

        // 4. 그룹 채팅 멤버 등록
        const insertValues = allMembers.map(id => [roomId, id]);
        await db.query(
            `
            INSERT INTO chat_room_members (room_id, user_id)
            VALUES ?
            `,
            [insertValues]
        );

        return NextResponse.json({
            message: "그룹채팅 생성 완료",
            roomId,
        });

    } catch (e: any) {
        console.error("GroupChat Error:", e);
        return NextResponse.json(
            { message: e.message },
            { status: 500 }
        );
    }
}