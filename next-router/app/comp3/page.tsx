"use client"
import Link from "next/link";
import Comp1 from "../comp1/page";
import { useState } from "react";

export default function Comp3(){

    // 다른 컴포넌트로 이동 / 데이터를 전달하는 작업
    // 데이터를 전달하는 방법 2가지
    // 1. Path Variable => /comp1/1
    // 2. Query String => /comp1?id=1&page=3

    // Path Variable => params 객체로 접근 ([id] 동적폴더 사용)
    // Qurey String => searchParams 객체로 접근 (?key=value&key=value)

    const id1 = '한글';

    const [inputs, setInputs] = useState({
        id:'1',
        nickname:'김영이'
    });

    const { id, nickname } = inputs;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black">
            <h1 className="text-3xl text-center font-bold m-5">Comp3.tsx page</h1>
            <div className="flex flex-col items-center gap-3">
                {/* path variable 방법으로 Param.tsx에 값을 전달 */}
                <Link href={`/param/${id1}`}>path variable로 데이터 전달</Link>

                {/* query string 방법으로 Param2.tsx에 값을 전달 */}
                <Link href={`/param?page=2&num=10&name=${id1}`}>query string 여러개의 데이터 전달</Link>
            </div>
            
            <div className="flex flex-col items-center gap-3">
                {/* student 데이터를 가져와서 출력 */}
                {/* name을 클릭하면 데이터를 param.tsx 로 학생의 이름을 전달 */}
                <Comp1 />
            </div>

            <div className="flex flex-col items-center gap-3">
                {/* input을 받고 전송을 누르면 id, nickname을 /param2?id=&nickname= 에 보내기*/}
                <input type="text" name="id" placeholder="id..." onChange={onChange}/>
                <input type="text" name="nickname" placeholder="nickname..." onChange={onChange}/>
                <Link href={`/param2?id=${id}&nickname=${nickname}`}><button>전송</button></Link>
            </div>
        </div>
    )
}