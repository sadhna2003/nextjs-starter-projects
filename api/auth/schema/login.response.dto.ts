export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  // Note: DummyJSON /auth/login does NOT return `role`.
  // role is only available via /users/:id or /auth/me (full user profile)
}
