import { useRef, useState } from "react"

const InputSample2 = ()=>{
    // input의 값이 여러개 일 경우
    const [inputs, setInputs]     = useState({
        // 여기서 사용할 이름을 생성
        name: '',
        nickname: ''
    });

    const { name, nickname } = inputs;

    const onChange = (e)=>{
        console.log(e.target);
        // name 속성은 key, value 속성은 value
        const { name, value } = e.target;
        setInputs({
            // 기존 값이 있다면 복사
            ...inputs,
            [name] : value // name 키를 가진 value값을 저장
        })
    }

    // useRef() : 특정한 DOM을 선택할 때 사용하는 HOOK
    // document.getElementBy** 역할을 하는 HOOK
    const nameInput = useRef();

    const onClick = ()=>{
        setInputs({name:'', nickname:''});
        // name input 창에 포커스 설정
        nameInput.current.focus();
    }

    return (
        <div>
            <input 
                type="text"
                name="name"
                value={name}
                placeholder="name..."
                onChange={onChange}
                ref={nameInput}
            />
            <input 
                type="text" 
                name="nickname"
                value={nickname} 
                placeholder="nickname..."
                onChange={onChange}
            />
            <button onClick={onClick}>초기화</button>
            <div>
                <b>이름(닉네임) : {name}({nickname})</b>
            </div>
        </div>
    )
}

export default InputSample2