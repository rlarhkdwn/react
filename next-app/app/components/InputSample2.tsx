import { useRef, useState } from "react"

export default function InputSample2(){

    const [ inputs, setInputs] = useState({
        // 여기서 사용할 객체 이름
        name:'',
        nickname:''
    })

    const {name, nickname} = inputs;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    // null! : 절대 null이 아니라고 확신할 때
    const nameInput = useRef<HTMLInputElement | null>(null)

    const onReset = ()=>{
        setInputs({
            name:'',
            nickname:''
        })
        nameInput.current?.focus();
    }

    return (
        <div className="flex flex-col item-center justify-center p-4">
            <input className="border border-gray-300 p-2"
                type="text"
                name="name"
                value={name}
                onChange={onChange}
            />
            <input className="border border-gray-300 p-2"
                type="text"
                name="nickname"
                value={nickname}
                onChange={onChange}
            />
            <button className="px-4 py-2 mr-3 bg-blue-500 text-white rounded" 
                onClick={onReset}
                >reset</button>
            <div className="mt-2">값 : {name} / {nickname}</div>
        </div>
    )
}