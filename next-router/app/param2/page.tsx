"use client"

import { useSearchParams } from "next/navigation";

// path varialbe + query string 같이 받기
// /param/1?page=2

// 한 폴더안에 동적 폴더가 여러개면 error

export default function Param3(){

    // query string => useSearchParams()
    const searchParam = useSearchParams();
    const id = searchParam.get('id') ?? '1';
    const nickname = searchParam.get('nickname') ?? '1';

    return (
        <div className="flex min-h-screen justify-center bg-zinc-50 mt-20 font-sans dark:bg-black">
            id = {id} \ nickname = {nickname}
        </div>
    )
}