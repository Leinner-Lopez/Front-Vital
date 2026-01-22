export interface MyJwtPayload {
    role: string;
    sub: string;
    iat:number;
    exp: number;
}