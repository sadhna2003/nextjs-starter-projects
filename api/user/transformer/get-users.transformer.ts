import { Transformer } from "@/api/base.transformer";

export interface UserResponseDto {
  id: number | string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email: string;
  phone?: string;
  role?: string;
  image?: string;
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetUsersListResponseDto {
  users?: UserResponseDto[];
  data?: UserResponseDto[];
  items?: UserResponseDto[];
  total?: number;
  limit?: number;
  skip?: number;
  page?: number;
}

export interface UserUiModel {
  id: string | number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  image?: string;
  lastLogin?: string;
  createdAt?: string;
}

export const getUsersTransformer: Transformer<any, UserResponseDto, any, UserUiModel> = {
  toResponse: (apiData: UserResponseDto): UserUiModel => {
    const firstName = (apiData.firstName || "").trim();
    const lastName = (apiData.lastName || "").trim();
    const username = apiData.username || "User";

    return {
      id: apiData.id,
      name: firstName && lastName ? `${firstName} ${lastName}` : username,
      email: apiData.email,
      role: apiData.role || "User",
      status: apiData.isActive ? "active" : "inactive",
      image: apiData.image,
      lastLogin: apiData.lastLogin,
      createdAt: apiData.createdAt,
    };
  },
};
