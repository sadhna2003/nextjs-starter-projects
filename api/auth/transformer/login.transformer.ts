import { Transformer } from "../../base.transformer";
import { LoginRequestDto } from "../schema/login.request.dto";
import { LoginResponseDto } from "../schema/login.response.dto";
import { LoginValue } from "@/types/login";

export const loginTransformer: Transformer<
  LoginRequestDto,
  LoginResponseDto,
  LoginValue,
any
> = {
  toRequest: (uiData: LoginValue): LoginRequestDto => {
    return {
      username: uiData.username,
      password: uiData.password,
    };
  },
  
  toResponse: (apiData: LoginResponseDto): any => {
    const uiModel: any = {
      accessToken: apiData.accessToken,
      refreshToken: apiData.refreshToken,
      user: {
        id: apiData.id,
        username: apiData.username,
        email: apiData.email,
        name: `${apiData.firstName} ${apiData.lastName}`,
        image: apiData.image,
        gender: apiData.gender,
        // role is NOT returned by DummyJSON /auth/login endpoint
      },
    };
    return uiModel;
  },
};
