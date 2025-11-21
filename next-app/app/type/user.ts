// 타입을 별도의 파일로 분리
export type userType = {
    id: number;
    username: string;
    email: string;
    active: boolean;
}

export type othersType = {
    // 다른 타입이 또 있다면 또 내보내기 가능
}