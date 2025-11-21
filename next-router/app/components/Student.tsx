import Link from "next/link";
import { studentType } from "../type/type";

type stdProps = {
    student: studentType;
}

export default function Student({student}: stdProps){
    const { name, age, addr, tel } = student;
    return(
        <div>
            <Link href={`/param/${name}`}>{name}</Link> ({age}) / ({addr}) / ({tel})
        </div>
    )
}