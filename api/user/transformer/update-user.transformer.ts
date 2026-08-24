import { Transformer } from "@/api/base.transformer";

interface UpdateUserRequestDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  isActive?: boolean;
  [key: string]: any;
}

interface UpdateUserResponseDto {
  id: number | string;
  firstName?: string;
  lastName?: string;
  email: string;
  username?: string;
  role?: string;
  phone?: string;
  image?: string;
  isActive?: boolean;
  updatedAt?: string;
}

interface UpdateUserUiModel {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  isActive?: boolean;
}

interface UpdateUserResponseUiModel {
  id: string | number;
  firstName?: string;
  lastName?: string;
  email: string;
  role?: string;
  updatedAt?: string;
}

export const updateUserTransformer: Transformer<
  UpdateUserRequestDto,
  UpdateUserResponseDto,
  UpdateUserUiModel,
  UpdateUserResponseUiModel
> = {
  toRequest: (uiData: UpdateUserUiModel): UpdateUserRequestDto => {
    const request: UpdateUserRequestDto = {};
    if (uiData.firstName !== undefined) request.firstName = uiData.firstName;
    if (uiData.lastName !== undefined) request.lastName = uiData.lastName;
    if (uiData.email !== undefined) request.email = uiData.email;
    if (uiData.phone !== undefined) request.phone = uiData.phone;
    if (uiData.role !== undefined) request.role = uiData.role;
    if (uiData.isActive !== undefined) request.isActive = uiData.isActive;
    return request;
  },

  toResponse: (apiData: UpdateUserResponseDto): UpdateUserResponseUiModel => {
    return {
      id: apiData.id,
      firstName: apiData.firstName,
      lastName: apiData.lastName,
      email: apiData.email,
      role: apiData.role,
      updatedAt: apiData.updatedAt,
    };
  },
};
