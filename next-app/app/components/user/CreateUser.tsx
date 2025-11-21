// props 타입 선언
type CreateUserProps = {
    username: string;
    email: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void;
    onCreate: ()=>void;
}

export default function CreateUser({username, email, onChange, onCreate}: CreateUserProps){
    return (
        <div className="createUser">
            <input 
                type="text" 
                className="border border-gray-500 p-2 rounded mb-2"
                placeholder="username"
                name="username"
                value={username}
                onChange={onChange}
            />
            <input 
                type="text" 
                className="border border-gray-500 p-2 rounded mb-2"
                placeholder="email"
                name="email"
                value={email}
                onChange={onChange}
            />
            <button className="px-4 py-2 ml-3 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={onCreate}
            >create</button>
        </div>
    )
}