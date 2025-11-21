import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json(
            { loggedIn: false },
            { status: 200 }
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return NextResponse.json(
            { loggedIn: true, user: decoded },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json(
            { loggedIn: false },
            { status: 200 }
        );
    }
}