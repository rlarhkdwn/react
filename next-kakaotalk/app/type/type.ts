export interface JWTPayload {
    id: number;
    username: string;
    nickname: string;
    iat: number; // 발행 시간
    exp: number; // 만료 시간
}