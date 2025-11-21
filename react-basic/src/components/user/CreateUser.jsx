const CreateUser = ({username, email, onChange, onCreate})=>{
    // 외부에서 받은 값을 띄우는 일
    return (
        <div>
            <input 
                type="text" 
                name="username"
                placeholder="username..."
                value={username}
                onChange={onChange}
            />
            <input 
                type="text"
                name="email"
                placeholder="email..."
                value={email}
                onChange={onChange}
            />
            <button onClick={onCreate}>추가</button>
        </div>
    )
}

export default CreateUser;