"use client"
import { useState } from "react"

export default function Comp2(){
    // count + - => 0~10
    const [count, setCount] = useState(0);

    
    // input 값 처리 onChange
    const [inputText, setInputText] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setInputText(e.target.value);
    }

    // input color 로 값 처리
    const [color, setColor] = useState('white');
    const style = {
        color: color
    }

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <h1 className="text-3xl font-bold m-5">Comp2.tsx page</h1>

            {/* counter */}
            <div className="flex">
                <button className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={()=>{setCount(count >= 10 ? 10 : count+1)}}
                >+</button>
                <h1 className="m-3">{count}</h1>
                <button className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={()=>{setCount(count <= 0 ? 0 : count-1)}}
                >-</button>
            </div>

            <br />

            <div>
                <input className="p-2 font-bold bg-blue-700"
                    type="text" 
                    placeholder="입력"
                    onChange={onChange}/>
                <br />
                <div className="p-2 font-bold bg-red-700">{inputText}</div>
            </div>

            <br />

            <div>
                <h2 style={style}>BackgroundColor</h2>
                <input type="color" onChange={(e)=>{setColor(e.target.value); console.log(color)}} />
            </div>
        </div>
    )
}