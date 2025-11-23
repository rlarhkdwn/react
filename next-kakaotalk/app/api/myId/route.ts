import { verifyToken } from "@/app/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json({ userId: null }, { status: 200 });
    }

    try {
        const decoded: any = verifyToken(token);
        return NextResponse.json({ userId: decoded.id });
    } catch (e) {
        return NextResponse.json({ userId: null }, { status: 200 });
    }
}