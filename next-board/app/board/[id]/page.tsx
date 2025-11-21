"use client"
//import { boardList } from "@/app/data/data";
import Link from "next/link";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function Detail(){
    const params = useParams();
    // const idx = params.id;
    // const board = boardList.filter(b => b.id.toString() === idx)[0];

    // async function 이용하여 DB에서 해당 데이터를 가지고 오기
    const [board, setBoard] = useState<boardType | null>(null);
    const idx = params.id;

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/board/${idx}`);
                if (!response.ok) throw new Error('게시글을 불러오지 못했습니다.')
                const data = await response.json();
                setBoard(data);
            } catch (e) {
                console.log(e);
                setBoard(null);
            }
        }
        fetchData();
    },[idx]);

    const onDelete = async ()=>{
        try {
            await fetch(`/api/board/${idx}`, {
                method: 'DELETE'
            });
        } catch (e) {
            console.log(e);
        }
        window.location.href = "/board"
    }

    if(!board) return <div className="container w-300 mx-auto my-10">Not Found!</div>

    return(
        <div className="container w-250 mx-auto my-10">
            <h1 className="text-center text-3xl">{idx}번 게시글</h1>
            <ul className="border border-gray-500 rounded my-10">
                <li className="text-2xl p-4">제목: {board.title}</li>
                <li className="p-4">작성자: {board.writer}</li>
                <li className="p-4">작성일: {board.reg_date}</li>
                <li className="border-t border-gray-500  p-4">{board.contents}</li>
            </ul>
            <div className="text-center mt-3">
                <Link href={'/board'}>
                    <button className="bg-green-500 text-white px-4 py-2 rounded">list</button>
                </Link>
                <Link href={`/board/${idx}/modify`}>
                    <button className="bg-green-500 text-white ml-5 px-4 py-2 rounded">modify</button>
                </Link>
                <button className="bg-green-500 text-white ml-5 px-4 py-2 rounded"
                    onClick={onDelete}
                >delete</button>
            </div>
        </div>
    )
}