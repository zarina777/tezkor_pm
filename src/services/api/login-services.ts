import { api } from "./api";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { LoginResponse } from "@/types";
const controller = "user/token/obtain";
type LoginQueryParams = {
  phone_number: string;
  password: string;
};
type AuthLoginApiType = {
  loginQuery: (
    data: LoginQueryParams
  ) => UseMutationResult<unknown, unknown, LoginQueryParams, unknown>;
};
export class AuthLoginApi implements AuthLoginApiType {
  constructor() {
    if (!(this instanceof AuthLoginApi)) {
      return new AuthLoginApi();
    }
  }

  loginQuery = () => {
    return useMutation({
      mutationFn: (data: LoginQueryParams) =>
        api.post(controller, data).then((res) => res.data as LoginResponse),
    });
  };
}
