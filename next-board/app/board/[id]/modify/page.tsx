"use client"
//import { boardList } from "@/app/data/data";
import Link from "next/link";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function Modify(){
    const params = useParams();
    // const idx = params.id;
    // const board = boardList.filter(b => b.id.toString() === idx)[0];

    const [board, setBoard] = useState<boardType | null>(null);
    const idx = params.id;

    // 수정할 데이터 보관용
    const [form, setForm] = useState({
        title: '',
        writer: '',
        contents: ''
    })

    const { title, writer, contents } = form;

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/board/${idx}`);
                if (!response.ok) throw new Error('게시글을 불러오지 못했습니다.')
                const data = await response.json();
                setBoard(data);
                // 수정할 form 객체에도 세팅
                setForm(data);
            } catch (e) {
                console.log(e);
                setBoard(null);
            }
        }
        fetchData();
    },[idx]);

    // 수정
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // 수정 데이터 DB 등록
    const onSubmit = async ()=>{
        const response = await fetch(`/api/board/${idx}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        
        // 등록이 끝나면 list 페이지로 이동
        window.location.href = `/board/${idx}`;
    }

    if(!board) return <div className="container w-300 mx-auto my-10">Not Found!</div>

    return(
        <div className="w-full m-10">
            <h2 className="text-center text-3xl">{board.id}번 게시글 수정</h2>
            <form className="flex flex-col space-y-4 w-300 mx-auto my-5">
                <input 
                    className="p-2 border rounded"
                    type="text" 
                    name="title"
                    value={title}
                    onChange={onChange}
                />
                <input 
                    className="p-2 border rounded"
                    type="text" 
                    name="writer"
                    value={writer}
                    readOnly
                    onChange={onChange}
                />
                <textarea 
                    className="h-100 p-2 border rounded"
                    name="contents" 
                    value={contents}
                    onChange={onChange}
                ></textarea>
                <div className="text-center">
                    <Link href={`/board/${idx}`}>
                        <button className="bg-green-500 text-white px-4 py-2 rounded">reset</button>
                    </Link>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded ml-3"
                        type="button"
                        onClick={onSubmit}
                    >modify</button>
                </div>
            </form>
        </div>
    )
}