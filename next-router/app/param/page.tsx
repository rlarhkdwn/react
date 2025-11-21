"use client"

import { useSearchParams } from "next/navigation";

// path varialbe + query string 같이 받기
// /param/1?page=2

// 한 폴더안에 동적 폴더가 여러개면 error

export default function Param2(){

    // query string => useSearchParams()
    const searchParam = useSearchParams();
    const page = searchParam.get('page') ?? '1';
    const num = searchParam.get('num') ?? '1';
    const name = searchParam.get('name') ?? '선택안함'; // 현재 안보낸 param

    return (
        <div className="flex min-h-screen justify-center bg-zinc-50 mt-20 font-sans dark:bg-black">
            현재 페이지 : page: {page} / num: {num} / name: {name}
        </div>
    )
}