export interface Transformer<
  TRequestDto = any,
  TResponseDto = any,
  TUiRequestModel = any,
  TUiResponseModel = any
> {
  toRequest?: (uiData: TUiRequestModel) => TRequestDto;
  toResponse?: (apiData: TResponseDto) => TUiResponseModel;
}
