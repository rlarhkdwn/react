import { studentType } from "../type/type"
import Student from "./Student"

type studentProp = {
    students: studentType[]
}

export default function Students({students}: studentProp){
    return (
        <div>
            {
                students.map((student, index) => (
                    <Student student={student} key={index}/>
                ))
            }
        </div>
    )
}