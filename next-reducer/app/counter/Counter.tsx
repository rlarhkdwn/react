import { useReducer, useState } from "react"
// reducer의 액션의 타입은 대문자로 쓰는 것이 규칙
type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' }

function reducer(state: number, action: Action){
    switch(action.type) {
        case 'INCREMENT':
            return state < 10 ? state + 1 : state
        case 'DECREMENT':
            return state > 0 ? state - 1 : state
        default:
            return state
    }
}

export default function Counter(){
    // useState 사용방식
    // const [number, setNumber] = useState(0);

    // reducer 사용방식
    const [number, dispatch] = useReducer(reducer, 0);

    const onIncrease = ()=>{
        //setNumber(n => n + 1)
        dispatch({type: 'INCREMENT'})
    }

    const onDecrease = ()=>{
        //setNumber(n => n - 1)
        dispatch({type: 'DECREMENT'})
    }

    return (
        <div>
            <h1 className="text-3xl text-bold p-2">{number}</h1>
            <button 
                className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
                onClick={onIncrease}
            >+</button>
            <button
                className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
                onClick={onDecrease}
            >-</button>
        </div>
    )
}