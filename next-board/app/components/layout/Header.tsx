import Link from "next/link";

export default function Header(){
    return (
        <div className="bg-gray-800 text-white p-4">
            <nav className="container mx-auto flex justify-between">
                <div>
                    <Link href="/">Next.js</Link>
                </div>
                <div className="space-x-4">
                    <Link href="/board">board</Link>
                    <Link href="/board/write">write</Link>
                </div>
            </nav>
        </div>
    )
}