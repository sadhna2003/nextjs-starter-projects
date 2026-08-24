import { Transformer } from "../../base.transformer";
import { GetMeResponseDto } from "../schema/get-me.response.dto";

export const getMeTransformer: Transformer<
  never,
  GetMeResponseDto,
  never,
  any
> = {
  toResponse: (apiData: GetMeResponseDto): any => {
    return {
      id: apiData.id,
      username: apiData.username,
      email: apiData.email,
      name: `${apiData.firstName} ${apiData.lastName}`,
      firstName: apiData.firstName,
      lastName: apiData.lastName,
      image: apiData.image,
      gender: apiData.gender,
      phone: apiData.phone,
      role: apiData.role,
    };
  },
};
