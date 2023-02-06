export interface JwtPayload {
  name?: string;
  email: string;
  picture: string;
  sub: string;
  inClass: boolean
  studentId: string
  firstName: string
  lastName: string
  iat: number;
  exp: number;
  jti: string;
}
