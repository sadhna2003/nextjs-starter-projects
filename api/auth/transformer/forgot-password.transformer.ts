import { Transformer } from "../../base.transformer";
import { ForgotPasswordRequestDto } from "../schema/forgot-password.request.dto";
import { ForgotPasswordResponseDto } from "../schema/forgot-password.response.dto";
import { ForgotPasswordValue } from "@/types/forgot-password";

export const forgotPasswordTransformer: Transformer<
  ForgotPasswordRequestDto,
  ForgotPasswordResponseDto,
  ForgotPasswordValue,
  any
> = {
  toRequest: (uiData: ForgotPasswordValue): ForgotPasswordRequestDto => {
    return {
      email: uiData.email,
    };
  },
  
  toResponse: (apiData: ForgotPasswordResponseDto): any => {
    return {
      message: apiData?.message || "Password reset link sent successfully.",
    };
  },
};
