import { Transformer } from "../../base.transformer";
import { ResetPasswordRequestDto } from "../schema/reset-password.request.dto";
import { ResetPasswordResponseDto } from "../schema/reset-password.response.dto";
import { ResetPasswordValue } from "@/types/reset-password";

export const resetPasswordTransformer: Transformer<
  ResetPasswordRequestDto,
  ResetPasswordResponseDto,
  ResetPasswordValue,
  any
> = {
  toRequest: (uiData: ResetPasswordValue): ResetPasswordRequestDto => {
    return {
      password: uiData.password,
    };
  },
  
  toResponse: (apiData: ResetPasswordResponseDto): any => {
    return {
      message: apiData?.message || "Password has been successfully updated.",
    };
  },
};
