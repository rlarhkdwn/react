import { useRef, useState } from "react";
import UserList1 from "./UserList1";
import CreateUser from "./CreateUser";

export default function UserList2(){
    // users의 변화를 주기 위해 (등록, 삭제, 수정) useState() 관리
    const [ users, setUsers ] = useState(
        [
            {
                id: 1,
                username: 'hong',
                email: 'publicHong@naver.com',
                active: true
            },
            {
                id: 2,
                username: 'kim',
                email: 'kim@gmail.com',
                active: false
            },
            {
                id: 3,
                username: 'lee',
                email: 'leeTest@gmail.com',
                active: false
            }
        ]
    );
    
    // 1. CreateUser 등록 라인 작성
    // 추가할 때 사용될 id 값 설정
    const nextId = useRef(4);

    const [inputs, setInputs] = useState({
        username:'',
        email:''
    });

    // 구조분해
    const { username, email } = inputs;

    // onChange 설정
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    // onCreate 설정
    const onCreate = () => {
        // onChange 실행 후 생긴 객체를 users 배열에 추가
        const user = {
            id: nextId.current,
            username: username,
            email: email,
            active: false
        }
        // 기존 users 값에 추가 (push / pop 처럼 직접 객체에 영향을 주는 함수는 쓰지 않음)
        setUsers(users.concat(user));
        nextId.current++;

        // 추가 후 inputs 객체 초기화
        setInputs({
            username:'',
            email:''
        })
    }

    // 삭제 설정
    const onRemove = (id: number)=>{
        // user id 값이 파라미터의 id와 일치하지 않는 요소만 추출하여 새로운 배열로 리턴
        const newUsers = users.filter(user => user.id !== id)
        setUsers(newUsers);
    }

    // 토글 설정
    const onToggle = (id: number)=>{
        const newUsers = users.map(user => user.id === id ? {...user, active : !user.active} : user)
        setUsers(newUsers);
    }

    // 총 사용자수 설정
    const userCount = () => {
        return users.length;
    }
    const count = userCount();

    // 활성 사용자수 설정
    const countActiveUser = () => {
        return users.filter(user => user.active).length;
    }
    const activeCount = countActiveUser();

    return (
        <div className="flex flex-col item-center justify-center p-4">
            <CreateUser 
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList1 users={users} onToggle={onToggle} onRemove={onRemove}/>
            <div>활성 인원수 : {activeCount} / {count} 명</div>
        </div>
    );
};