type UserType = {
    id: number;
    username: string;
    email: string;
}

type UserProps = {
    user: UserType;
}

const User = ({user} : UserProps)=>{
    const { id, username, email } = user;
    return (
        <div className="flex flex-col item-center justify-center p-4">
            <h3>{user.id} / {user.username} ({user.email})</h3>
        </div>
    )
}

export default function UserList() {
    const users = [
        {
            id: 1,
            username: 'hong',
            email: 'publicHong@naver.com'
        },
        {
            id: 2,
            username: 'kim',
            email: 'kim@gmail.com'
        },
        {
            id: 3,
            username: 'lee',
            email: 'leeTest@gmail.com'
        }
    ]

    return(
        <div className="flex flex-col item-center justify-center p-4">
            <h2 className="font-bold mb-2">User List</h2>
            {/* {users[0].id} / {users[0].name} / {users[0].email} */}
            
            {/* 컴포넌트로 분리 */}
            
            {
                users.map((user) => (
                    <User user={user} key={user.id} />
                ))
            }
        </div>
    )
}