import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json(
        { message: "로그아웃 완료" },
        { status: 200 }
    );

    // JWT 쿠키 삭제
    res.cookies.set("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: new Date(0),  // 즉시 만료
        path: "/"
    });

    return res;
}