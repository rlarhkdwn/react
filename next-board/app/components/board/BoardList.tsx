import Link from "next/link";
import { boardList } from "../../data/data";
import { useEffect, useState } from "react";

export default function BoardList(){
    // data.ts에서 sample data 가져오기
    // const board = boardList;

    const [board, setBoard] = useState<boardType[] | []>([]);
    // DB에서 가져오기
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch('/api/board');
                const data = await response.json();
                setBoard(data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    },[]);

    if(!board) return <div className="container w-300 mx-auto my-10">Not Found!</div>

    return(
        <div className="container w-300 mx-auto my-10">
            <table className="table-auto w-full border border-gray-300 text-center">
                <thead>
                    <tr className="border border-gray-300 bg-gray-700 text-xl h-10">
                        <th className="pl-1">ID</th>
                        <th className="pl-5">title</th>
                        <th className="pl-20">writer</th>
                        <th className="pl-20">reg_date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        board.map(b => (
                            <tr key={b.id} className="h-10 border border-gray-600">
                                <td className="pl-1">{b.id}</td>
                                <td className="pl-5 hover:underline"><Link href={`/board/${b.id}`}>{b.title}</Link></td>
                                <td className="pl-20">{b.writer}</td>
                                <td className="pl-20">{(b.reg_date).slice(0,10)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="text-center mt-3">
                <Link href={'/'}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">home</button>
                </Link>
                <Link href={'/board/write'}>
                    <button className="bg-green-500 text-white ml-5 px-4 py-2 rounded">add</button>
                </Link>
            </div>
        </div>
    )
}