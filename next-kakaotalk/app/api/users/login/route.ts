import db from "@/app/lib/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();
        console.log(username)
        if (!username || !password) {
            return NextResponse.json(
                { message: "아이디와 비밀번호를 입력해주세요." },
                { status: 400 }
            );
        }

        // 1. 사용자 조회
        const [rows]: any = await db.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

        if (rows.length === 0) {
            return NextResponse.json(
                { message: "존재하지 않는 아이디입니다." },
                { status: 404 }
            );
        }

        const user = rows[0];

        // 2. 비밀번호 검증
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                { message: "비밀번호가 일치하지 않습니다." },
                { status: 401 }
            );
        }

        // 3. JWT 생성
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                nickname: user.nickname
            },
            process.env.JWT_SECRET!,   // 비밀키
            { expiresIn: "1d" }        // 토큰 만료 1일
        );

        // 4. 쿠키에 JWT 저장
        const res = NextResponse.json(
            { message: "로그인 성공" },
            { status: 200 }
        );

        res.cookies.set("token", token, {
            httpOnly: true,    // JS 접근 불가 (XSS 방어)
            secure: true,      // HTTPS에서만 쿠키 사용 (개발환경이면 false 가능)
            sameSite: "lax",   // strict, lax, none 어느 도메인을 타고왔는지에 따라 쿠키 발급 여부 설정
            maxAge: 60 * 60 * 24,  // 1일
            path: "/"
        });

        return res;

    } catch (e: any) {
        console.error(e);
        return NextResponse.json(
            { message: e.message },
            { status: 500 }
        );
    }
}