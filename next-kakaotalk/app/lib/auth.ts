import jwt from "jsonwebtoken";
import { JWTPayload } from "../type/type";

export function verifyToken(token: string): JWTPayload {
    return jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
}