import { useState } from "react";

const InputSample = ()=>{
    // input value 값의 변수 useState로 관리
    const [text, setText] = useState('');

    // text 변수에 input에서 쓰이는 글자가 저장되는 과정
    // input에 값이 적히거나, 삭제되거나 변화할 때마다 text가 변경되는 함수
    // onChange => input 의 상태가 변경될때마다 실행

    const onChange = (e)=>{
        console.log(e.target.value);
        setText(e.target.value);
    }

    // 초기화 버튼

    const onClick = ()=>{
        setText('');
    }

    return (
        <div className="InputSample">
            {/* value => 낵 입력한 값 */}
            <input type="text" name="text" value={text} onChange={onChange}/>

            <button onClick={onClick}>초기화</button>
            <div>
                <b>값 : {text}</b>
            </div>
        </div>
    )
}

export default InputSample