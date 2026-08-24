import { Transformer } from "@/api/base.transformer";

interface CreateUserRequestDto {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  phone?: string;
  role?: string;
  username?: string;
  [key: string]: any;
}

interface CreateUserResponseDto {
  id: number | string;
  firstName?: string;
  lastName?: string;
  email: string;
  username?: string;
  role?: string;
  phone?: string;
  image?: string;
  createdAt?: string;
}

interface CreateUserUiModel {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  phone?: string;
  role?: string;
}

interface CreateUserResponseUiModel {
  id: string | number;
  firstName?: string;
  lastName?: string;
  email: string;
  role?: string;
  createdAt?: string;
}

export const createUserTransformer: Transformer<
  CreateUserRequestDto,
  CreateUserResponseDto,
  CreateUserUiModel,
  CreateUserResponseUiModel
> = {
  toRequest: (uiData: CreateUserUiModel): CreateUserRequestDto => {
    return {
      firstName: uiData.firstName,
      lastName: uiData.lastName,
      email: uiData.email,
      password: uiData.password,
      phone: uiData.phone,
      role: uiData.role || "user",
    };
  },

  toResponse: (apiData: CreateUserResponseDto): CreateUserResponseUiModel => {
    return {
      id: apiData.id,
      firstName: apiData.firstName,
      lastName: apiData.lastName,
      email: apiData.email,
      role: apiData.role,
      createdAt: apiData.createdAt,
    };
  },
};
