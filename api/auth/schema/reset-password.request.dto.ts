export interface ResetPasswordRequestDto {
  password: string;
  token?: string; // Often required by backends to identify the reset request
}
