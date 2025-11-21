const User = ({user, onRemove, onToggle})=>{
    return (
        <div>
            <b style={{color: user.active ? 'green' : 'black'}}
                onClick={()=>{onToggle(user.id)}}
            >{user.username}</b> <span>({user.email})</span>
            <button onClick={()=>{onRemove(user.id)}}>❌</button>
        </div>
    )
}

export default User;