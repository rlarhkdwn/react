// PUT(수정), GET(단일 조회), DELETE(삭제)

import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

// _:NextRequest
// _(언더스코어) : "사용하지 않는 변수" 라는 것을 명시적으로 표시
// _ 또는 _req 로 사용
export async function GET(_:NextRequest, { params } : {params: {id:string}}) {
    try {
        // select의 리턴 값은 무조건 배열
        // select의 리턴값이 하나라면 배열의 0번지 값을 사용

        const {id} = await params;
        const [rows] = await db.query('SELECT * FROM board WHERE id = ?', [id])
        if ((rows as any[]).length === 0) {
            return NextResponse.json({message: '게시글 없음'}, {status: 404})
        }
        return NextResponse.json((rows as any[])[0])
    } catch (e: any) {
        return NextResponse.json({message: e.message}, {status: 404})
    }
}


export async function DELETE(_:NextRequest, { params } : {params: {id:string}}) {
    try {
        const {id} = await params;
        await db.query('DELETE FROM board WHERE id = ?', [id])
    } catch (e: any) {
        return NextResponse.json({message: e.message}, {status: 500})
    }
}


export async function PUT(req:NextRequest, { params } : {params: {id:string}}) {
    try {
        const {id} = await params;
        const { title, writer, contents } = await req.json();
        await db.query('UPDATE board SET title=?, writer=?, contents=? where id=?', [title, writer, contents, id])
    } catch (e: any) {
        return NextResponse.json({message: e.message}, {status: 500})
    }
}