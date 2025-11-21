"use client"
import Link from "next/link";
import { useState } from "react";

export default function Write(){
    const [form, setForm] = useState({
        title:'',
        writer:'',
        contents:''
    });

    const { title, writer, contents } = form;

    // onChange
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    // onSubmit
    const onSubmit = async ()=>{
        // title, writer, contents 값이 없으면 alert
        if (!title || !writer || !contents) {
            alert('모든항목을 입력해주세요.')
            return;
        }

        // 등록 => DB로 등록
        // request => 내가 보내는 객체 (요청 객체)
        // response => 서버에서 보내는 객체 (응답 객체)
        const response = await fetch('/api/board', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        
        // 등록이 끝나면 list 페이지로 이동
        window.location.href = "/board";
    }
    
    return(
        <div className="w-full m-10">
            <h2 className="text-center text-3xl">게시글 등록</h2>
            <form className="flex flex-col space-y-4 w-300 mx-auto my-5">
                <input 
                    className="p-2 border rounded"
                    type="text" 
                    name="title"
                    value={title}
                    placeholder="제목"
                    onChange={onChange}
                />
                <input 
                    className="p-2 border rounded"
                    type="text" 
                    name="writer"
                    value={writer}
                    placeholder="작성자"
                    onChange={onChange}
                />
                <textarea 
                    className="h-100 p-2 border rounded"
                    name="contents" 
                    placeholder="내용"
                    cols={30}
                    rows={10}
                    onChange={onChange}
                    value={contents}
                ></textarea>
                <div className="text-center">
                    <Link href={'/board'}>
                        <button className="bg-green-500 text-white px-4 py-2 rounded">list</button>
                    </Link>
                    <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded ml-3"
                        onClick={onSubmit}
                    >add</button>
                </div>
            </form>
        </div>
    )
}