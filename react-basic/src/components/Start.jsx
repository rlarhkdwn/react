// function Start() {
//     return (
//         <div className="Start">
//             <h2>Hello Start.jsx area</h2>
//         </div>
//     )
// }

// 화살표 함수
const Start = ()=>{
    // 내부 변수 사용
    const name = '홍길동';
    // 주석
    
    // 스타일 객체 선언
    const style = {
        color : 'white',
        backgroundColor : 'black'
    }

    return (
        <div className="Start">
            {/* return 안쪽 가상 DOM 영역 주석 */}
            <h2 style={style}>{name} Hello Start.jsx area</h2>
        </div>
    )
}

export default Start;