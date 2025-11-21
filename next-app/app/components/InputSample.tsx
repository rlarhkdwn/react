import { useState } from "react"

export default function InputSample(){
    
    // input의 값이 변경되면 input value값이 업데이트 되어야 함.
    // useState()로 관리
    const [ text, setText ] = useState<string>(''); // 문자 타입으로 초기설정은 빈 문자열
    
    // e : event 해당 event의 대상이 되는 target의 객체(element)
    // React.ChangeEvent<HTMLInputElement>
    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setText(e.target.value);
    }

    return (
        <div className="flex flex-col item-center justify-center p-4">
            <input className="border border-gray-300 p-2"
                type="text"
                name="text"
                value={text}
                onChange={onChange}
            />
            <button className="px-4 py-2 mr-3 bg-blue-500 text-white rounded" 
                onClick={()=>setText('')}
                >reset</button>
            <div className="mt-2">값 : {text}</div>
        </div>
    )
}