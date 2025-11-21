import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

// 아이디 중복 체크용
export async function GET(_:NextRequest, { params } : {params: {username:string}}) {
    try {
        const {username} = await params;
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        // 결과 1개라도 있으면 중복 → 사용 불가
        if ((rows as any[]).length > 0) {
            return NextResponse.json(
                { message: "이미 존재하는 아이디입니다." },
                { status: 409 }
            );
        }

        // 없으면 사용 가능
        return NextResponse.json(
            { message: "사용 가능한 아이디입니다." },
            { status: 200 }
        );

    } catch (e: any) {
        return NextResponse.json(
            { message: e.message },
            { status: 500 }
        );
    }
}