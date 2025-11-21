import Students from "../components/Students";
import { student, students } from "../data/data";

export default function Comp1(){
    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <h1 className="text-3xl font-bold m-5">Comp1.tsx page</h1>
            {/* data 폴더에 있는 student 객체 출력 */}
            <div>
                {student.name} ({student.age}) / ({student.addr}) / ({student.tel})
            </div>

            <hr className="border-gray-600 w-100 m-2"/>
            
            {/* data 폴더에 있는 student 객체를 출력 Student 컴포넌트 생성 */}
            <Students students={students} />
        </div>
    )
}