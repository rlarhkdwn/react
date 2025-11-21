"use client"
import { useParams } from "next/navigation"

export default function Param(){
    // useParams()
    const params = useParams();

    // 한글 깨짐 현상 방지
    const id = decodeURIComponent(params.id as string | '');

    return (
        <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black">
            params : {id} 
        </div>
    )
}