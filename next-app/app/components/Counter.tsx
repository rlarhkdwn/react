// "use client" => page.tsx에서 관리
import { useState } from "react"

export default function Counter(){
    // useState
    // typeScript
    const [count, setCount] = useState<number>(0);

    return (
        <div className="m-3">
            <h1 className="text-2xl m-2">{count}</h1>
            <button className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={()=>{setCount(count+1)}}
                >+</button>
            <button className="px-4 py-2 mx-3 bg-blue-500 text-white rounded" 
                onClick={()=>{setCount(count-1)}}
                >-</button>
        </div>
    )
}