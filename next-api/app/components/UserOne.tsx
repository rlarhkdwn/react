// users에서 id를 전달받아
// https://jsonplaceholder.typicode.com/users/id
// 가져와서 출력

import { useEffect, useState } from "react";
import { userType } from "../type/type";
import axios from "axios";

export default function UserOne({id}: {id: number}){
    const [user, setUser] = useState<userType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null> ('');

    // axios 별도 설치 라이브러리 npm i axios

    const fetchUser = async ()=>{
        try {
            // 요청이 시작되기 전 error, loading, users 값 세팅
            setError(null);
            setUser(null);
            setLoading(true);

            // 데이터 가져오기
            const response = await axios.get<userType>(`https://jsonplaceholder.typicode.com/users/${id}`);
            console.log(response.data);
            setUser(response.data);
        } catch (err: any) {
            setError(err);
        }
        // 로딩 끝나고 난 후 설정 변경
        setLoading(false);
    }

    useEffect(()=>{
        fetchUser();
    }, [id]);

    if (loading) return <div>loading...</div>
    if (error) return <div>error...</div>
    if (!user) return <div>null</div>
    return (
        <div>
            <ul className="m-5 border-2 p-4">
                <li className="text-2xl text-bold">{user.username}</li>
                <li>name : {user.name}</li>
                <li>Email : {user.email}</li>
                <li>Phone : {user.phone}</li>
                <li>website : {user.website}</li>
            </ul>
        </div>
    )
}