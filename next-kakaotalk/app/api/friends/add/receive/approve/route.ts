import { verifyToken } from "@/app/lib/auth";
import db from "@/app/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
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

        const { id } = await req.json(); 
        console.log(id)
        // 1. 받은 친구 요청 테이블에서 존재 여부 확인
        const [pending] = await db.query(
            "SELECT * FROM friends WHERE user_id = ? AND friend_id = ? and state = 'pending'",
            [id, myId]
        );

        if ((pending as any[]).length === 0) {
            return NextResponse.json(
                { message: "해당 친구 요청이 존재하지 않습니다." },
                { status: 404 }
            );
        }

        // 2. 요청 목록에서 제거
        await db.query(
            `DELETE FROM friends
            WHERE (user_id = ? AND friend_id = ? AND state = 'pending')
                OR (user_id = ? AND friend_id = ? AND state = 'pending')`,
            [myId, id, id, myId]
        );

        // 3. 친구로 등록
        await db.query(
            `INSERT INTO friends (user_id, friend_id, state) VALUES (?, ?, 'accepted')`,
            [myId, id]
        );

        await db.query(
            `INSERT INTO friends (user_id, friend_id, state) VALUES (?, ?, 'accepted')`,
            [id, myId]
        );

        return NextResponse.json(
            { message: "친구 요청 승인 완료" },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("PUT approve error:", error);
        return NextResponse.json(
            { message: error.message || "Server Error" },
            { status: 500 }
        );
    }
}