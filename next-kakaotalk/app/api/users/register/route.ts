import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req:NextRequest) {
    try {
        const { username, nickname, password } = await req.json();

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);

        // DB 삽입
        await db.query(
            'INSERT INTO users (username, password, nickname) values(?, ?, ?)',
            [username, hashedPassword, nickname]
        );

        // 성공 응답
        return NextResponse.json(
            { message: "회원가입 완료" },
            { status: 201 }
        );

    } catch (e: any) {
        return NextResponse.json(
            { message: e.message },
            { status: 500 }
        );
    }
}