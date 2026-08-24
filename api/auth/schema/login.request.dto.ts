export interface LoginRequestDto {
  username: string;
  password: string;
  expiresInMins?: number;
}
