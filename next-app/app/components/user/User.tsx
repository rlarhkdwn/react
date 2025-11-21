import { userType } from "@/app/type/user";

type userProps = {
    user: userType;
    onToggle: (id: number) => void;
    onRemove: (id: number) => void;
}

export default function User({user, onToggle, onRemove}: userProps){
    return (
        <div className="flex item-center justify-center p-4">
            <b
                style={{color: user.active ? 'green' : 'white'}}
                onClick={()=>onToggle(user.id)}
            >{user.username}</b><span>( {user.email} )</span>
            <button className="px-2 py-1 ml-3 text-sm bg-red-500 text-white rounded hover:bg-red-700"
                onClick={()=>{onRemove(user.id)}}
            >X</button>
        </div>
    )
}