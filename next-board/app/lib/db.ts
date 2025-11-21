import mysql from 'mysql2/promise';
// 자동으로 .env.local 파일을 호출해옴
// process.env.MYSQL_HOST => 호출

const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: Number(process.env.MYSQL_PORT),
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10
})

// waitForConnections
// 연결이 없고 제한에 도달했을 때 풀의 동작을 결정
// true : 풀의 연결 요청을 대기열에 넣고 사용 가능해지면 호출
// false : 즉시 오류와 함께 다시 호출 
// 기본값 : true

// connectionLimit
// 한번에 생성할 수 있는 최대 연결 수
// 기본값 : 10

export default db;