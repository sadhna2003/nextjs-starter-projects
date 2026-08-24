import { fetchApi } from "../fetch-api";
import { getUsersTransformer, GetUsersListResponseDto, UserUiModel, UserResponseDto } from "./transformer/get-users.transformer";
import { createUserTransformer } from "./transformer/create-user.transformer";
import { updateUserTransformer } from "./transformer/update-user.transformer";

interface GetUsersListUiModel {
  items: UserUiModel[];
  total: number;
  page: number;
  pageSize: number;
}

interface CreateUserUiModel {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  phone?: string;
  role?: string;
}

interface UpdateUserUiModel {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  isActive?: boolean;
}

export const userService = {
  /**
   * Get paginated users list
   * @param page Page number (0-indexed)
   * @param limit Items per page
   */
  getUsers: async (
    page: number = 0,
    limit: number = 10
  ): Promise<GetUsersListUiModel> => {
    const skip = page * limit;

    const rawResponse = await fetchApi<GetUsersListResponseDto>(
      `/users?limit=${limit}&skip=${skip}`,
      {
        method: "GET",
        requiresAuth: false,
      }
    );

    // Transform response data
    const responseData = rawResponse.users || rawResponse.data || rawResponse.items || [];
    const items: UserUiModel[] = responseData.map((user: UserResponseDto) =>
      getUsersTransformer.toResponse!(user)
    );

    const total = rawResponse.total || items.length;

    return {
      items,
      total,
      page,
      pageSize: limit,
    };
  },

  /**
   * Get single user by ID
   * @param id User ID
   */
  getUserById: async (id: string | number): Promise<UserUiModel> => {
    const rawResponse = await fetchApi<UserResponseDto>(`/users/${id}`, {
      method: "GET",
      requiresAuth: false,
    });

    return getUsersTransformer.toResponse!(rawResponse);
  },

  /**
   * Get user for editing (returns raw DTO with all fields)
   * @param id User ID
   */
  getUserForEdit: async (id: string | number): Promise<UserResponseDto> => {
    const rawResponse = await fetchApi<UserResponseDto>(`/users/${id}`, {
      method: "GET",
      requiresAuth: false,
    });

    return rawResponse;
  },

  /**
   * Search users by query
   * @param query Search query
   * @param page Page number
   * @param limit Items per page
   */
  searchUsers: async (
    query: string,
    page: number = 0,
    limit: number = 10
  ): Promise<GetUsersListUiModel> => {
    const skip = page * limit;

    const rawResponse = await fetchApi<GetUsersListResponseDto>(
      `/users/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`,
      {
        method: "GET",
        requiresAuth: false,
      }
    );

    const responseData = rawResponse.users || rawResponse.data || rawResponse.items || [];
    const items: UserUiModel[] = responseData.map((user: UserResponseDto) =>
      getUsersTransformer.toResponse!(user)
    );

    const total = rawResponse.total || items.length;

    return {
      items,
      total,
      page,
      pageSize: limit,
    };
  },

  /**
   * Create new user
   * @param userData User data
   */
  createUser: async (userData: CreateUserUiModel): Promise<UserUiModel> => {
    const requestPayload = createUserTransformer.toRequest!(userData);

    const rawResponse = await fetchApi<any>("/users/add", {
      method: "POST",
      body: requestPayload,
      requiresAuth: true,
    });

    return getUsersTransformer.toResponse!(rawResponse);
  },

  /**
   * Update user by ID
   * @param id User ID
   * @param userData Updated user data
   */
  updateUser: async (
    id: string | number,
    userData: UpdateUserUiModel
  ): Promise<UserUiModel> => {
    const requestPayload = updateUserTransformer.toRequest!(userData);

    const rawResponse = await fetchApi<any>(`/users/${id}`, {
      method: "PUT",
      body: requestPayload,
      requiresAuth: true,
    });

    return getUsersTransformer.toResponse!(rawResponse);
  },

  /**
   * Delete user by ID
   * @param id User ID
   */
  deleteUser: async (id: string | number): Promise<void> => {
    await fetchApi<void>(`/users/${id}`, {
      method: "DELETE",
      requiresAuth: true,
    });
  },

  /**
   * Get users by role filter
   * @param role Role to filter by
   * @param page Page number
   * @param limit Items per page
   */
  getUsersByRole: async (
    role: string,
    page: number = 0,
    limit: number = 10
  ): Promise<GetUsersListUiModel> => {
    const skip = page * limit;

    const rawResponse = await fetchApi<GetUsersListResponseDto>(
      `/users?role=${encodeURIComponent(role)}&limit=${limit}&skip=${skip}`,
      {
        method: "GET",
        requiresAuth: false,
      }
    );

    const responseData = rawResponse.users || rawResponse.data || rawResponse.items || [];
    const items: UserUiModel[] = responseData.map((user: UserResponseDto) =>
      getUsersTransformer.toResponse!(user)
    );

    const total = rawResponse.total || items.length;

    return {
      items,
      total,
      page,
      pageSize: limit,
    };
  },
};

export type { GetUsersListUiModel, CreateUserUiModel, UpdateUserUiModel, UserUiModel, UserResponseDto };
