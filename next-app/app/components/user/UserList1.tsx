import { userType } from "@/app/type/user";
import User from "./User";

type userProps = {
    users: userType[];
    onToggle: (id: number)=>void;
    onRemove: (id: number)=>void;
}

export default function UserList1({users, onToggle, onRemove} : userProps){
    return (
        <div className="flex flex-col item-center justify-center p-4">
            {
                users.map(user => (
                    <User user={user} onToggle={onToggle} onRemove={onRemove} key={user.id}/>
                ))
            }
        </div>
    )
}