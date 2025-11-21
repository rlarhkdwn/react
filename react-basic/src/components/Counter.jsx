import { useState } from "react";

const Counter = ()=>{
    // onClick={함수명} : 클릭 이벤트 실행

    // 가상 DOM에서 변경되는 값을 관리 HOOK
    // useState() : 변수의 상태를 관리하는 훅
    const [number, setNumber] = useState(0);

    const onIncrease = ()=>{
        if (number >= 10){
            setNumber(10);
        } else {
            // setNumber(number + 1);
            // 함수형 업데이트 : 컴포넌트에 최적화 시킬떄 사용
            setNumber(n => n + 1)
        }
    }
    const onDecrease = ()=>{
        if (number <= 0){
            setNumber(0);
        } else {
            // setNumber(number - 1);
            setNumber(n => n - 1)
        }
    }

    return (
        <div className="Counter">
            <h1>{number}</h1>
            <button onClick={onIncrease}>+</button>
            <button onClick={onDecrease}>-</button>
        </div>
    );
}

export default Counter;