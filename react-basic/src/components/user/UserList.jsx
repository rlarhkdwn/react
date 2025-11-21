const User = ({user})=>{
    return (
        <div>
            <h3>{user.id} / {user.username} ({user.email})</h3>
        </div>
    )
}

const UserList = ()=>{

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

    return (
        <div>
            {/* 값이 하나라면 user.id, user.username, user.email */}
            {/* <h3>{users[0].id} / {users[0].username} / {users[0].email}</h3>
            <h3>{users[1].id} / {users[1].username} / {users[1].email}</h3>
            <h3>{users[2].id} / {users[2].username} / {users[2].email}</h3> */}

            {/* 반복문을 통해 값을 반복 map */}
            {/* user를 출력할 컴포넌트 */}
            {
                users.map(user=>(
                    // <h3>{user.id} / {user.username} / {user.email}</h3>
                    <User user={user} key={user.id}/>
                ))
            }

            {/* 만약 key로 사용할 만한 값이 없다면... array index 사용 */}
            {
                users.map((user, index)=>(
                    <User user={user} key={index}/>
                ))
            }
        </div>
    )
}

export default UserList