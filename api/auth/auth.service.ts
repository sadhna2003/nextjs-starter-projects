import { fetchApi } from "../fetch-api";
import { loginTransformer } from "./transformer/login.transformer";
import { getMeTransformer } from "./transformer/get-me.transformer";
import { forgotPasswordTransformer } from "./transformer/forgot-password.transformer";
import { resetPasswordTransformer } from "./transformer/reset-password.transformer";
import { LoginValue } from "@/types/login";
import { ForgotPasswordValue } from "@/types/forgot-password";
import { ResetPasswordValue } from "@/types/reset-password";
import { LoginResponseDto } from "./schema/login.response.dto";
import { GetMeResponseDto } from "./schema/get-me.response.dto";
import { ForgotPasswordResponseDto } from "./schema/forgot-password.response.dto";
import { ResetPasswordResponseDto } from "./schema/reset-password.response.dto";
import Cookies from "js-cookie";

export const authService = {
  login: async (uiData: LoginValue): Promise<any> => {
    // 1. Transform UI input to Backend Request DTO
    const requestPayload = loginTransformer.toRequest!(uiData);
    
    // 2. Call API Layer
    const rawResponse = await fetchApi<LoginResponseDto>("/auth/login", {
      method: "POST",
      body: requestPayload,
      requiresAuth: false,
    });
    
    // 3. Transform Backend Response DTO to UI Model
    const loginModel = loginTransformer.toResponse!(rawResponse);
    
    // 4. Store tokens in cookies first (needed for getMe auth)
    Cookies.set("accessToken", loginModel.accessToken, { 
      expires: 1,
      path: "/", 
      secure: process.env.NODE_ENV === "production" 
    });

    Cookies.set("refreshToken", loginModel.refreshToken, { 
      expires: 1,
      path: "/", 
      secure: process.env.NODE_ENV === "production" 
    });

    // 5. Fetch full user profile (includes role)
    const fullUser = await authService.getMe();

    // 6. Store full user in cookies
    Cookies.set("user", JSON.stringify(fullUser), { 
      expires: 1, 
      path: "/" 
    });

    return {
      accessToken: loginModel.accessToken,
      refreshToken: loginModel.refreshToken,
      user: fullUser,
    };
  },

  getMe: async (): Promise<any> => {
    // 1. Call API Layer
    const rawResponse = await fetchApi<GetMeResponseDto>("/auth/me", {
      method: "GET",
      requiresAuth: true,
    });
    
    // 2. Transform Backend Response DTO to UI Model
    const uiModel = getMeTransformer.toResponse!(rawResponse);
    
    return uiModel;
  },

  forgotPassword: async (uiData: ForgotPasswordValue): Promise<any> => {
    // 1. Transform UI input to request payload
    const requestPayload = forgotPasswordTransformer.toRequest!(uiData);
    
    // 2. Call unified API layer
    const rawResponse = await fetchApi<ForgotPasswordResponseDto>("/auth/forgot-password", {
      method: "POST",
      body: requestPayload,
      requiresAuth: false,
    });
    
    // 3. Map API response to UI model
    return forgotPasswordTransformer.toResponse!(rawResponse);
  },

  resetPassword: async (uiData: ResetPasswordValue, resetToken?: string): Promise<any> => {
    // 1. Transform UI input to request payload
    const requestPayload = resetPasswordTransformer.toRequest!(uiData);
    if (resetToken) requestPayload.token = resetToken;
    
    // 2. Call unified API layer
    const rawResponse = await fetchApi<ResetPasswordResponseDto>("/auth/reset-password", {
      method: "POST",
      body: requestPayload,
      requiresAuth: false,
    });
    
    // 3. Map API response to UI model
    return resetPasswordTransformer.toResponse!(rawResponse);
  },

  logout: async (): Promise<void> => {
    Cookies.remove("accessToken", { path: "/" });
    Cookies.remove("refreshToken", { path: "/" });
    Cookies.remove("user", { path: "/" });
    window.location.href = "/login";
  },

  updateProfile: async (data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  }): Promise<any> => {
    const rawResponse = await fetchApi<any>("/auth/profile", {
      method: "PUT",
      body: data,
      requiresAuth: true,
    });

    return {
      message: "Profile updated successfully!",
      ...rawResponse,
    };
  },

  changePassword: async (data: {
    oldPassword: string;
    password: string;
    confirmPassword: string;
  }): Promise<any> => {
    const rawResponse = await fetchApi<any>("/auth/change-password", {
      method: "POST",
      body: {
        oldPassword: data.oldPassword,
        password: data.password,
      },
      requiresAuth: true,
    });

    return {
      message: "Password changed successfully!",
      ...rawResponse,
    };
  },
};
