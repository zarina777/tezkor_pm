import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  addOrganizationUser,
  addRefreshToken,
  addTokenToAxios,
} from "@/services/api";
import { AuthLoginApi } from "@/services/api/login-services";
import useUserStore from "@/store/useUserData";
import { Loader } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormSchemaType, schema } from "./schema";

const LoginForm: React.FC = () => {
  const { saveUserData } = useUserStore();
  const { loginQuery } = new AuthLoginApi();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const postLogin = loginQuery();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormSchemaType) => {
    console.log(data, "form");

    postLogin.mutate(data, {
      onSuccess: (res) => {
        addTokenToAxios(res?.access);
        addRefreshToken(res?.refresh);
        saveUserData(res?.user);
        addOrganizationUser(res?.user);
        navigate("/");
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(`${error?.response?.data?.message}`);
        }
      },
    });
  };

  const {
    formState: { isValid, isDirty },
  } = form;
  console.log(form.formState.errors);

  return (
    <div className="w-full mx-auto text-black">
      <div className="h-[92px]"></div>
      <h1 className="text-4xl font-semibold py-2">{t("auth.login")}</h1>
      <Form {...form}>
        <form
          className="flex flex-col gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col my-3 gap-1">
            <FormField
              control={form.control}
              name="phone_number" // Corrected from `phone_number` to `name`
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="text-left mb-1 font-light text-[rgba(52,64,84,1)] dark:text-white">
                    {t("auth.phone_number")}
                  </FormLabel>
                  <FormControl className="w-full">
                    <input
                      type="text"
                      className="border h-11 px-2.5 py-3.5 rounded-lg"
                      placeholder="Phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <FormField
              control={form.control}
              name="password" // Correct `name` usage
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="text-left mb-1 font-light text-[rgba(52,64,84,1)] dark:text-white">
                    {t("auth.password")}
                  </FormLabel>
                  <FormControl className="w-full">
                    <input
                      id="password"
                      type="password"
                      className="border h-11 px-2.5 py-3.5 rounded-lg"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <Button
            className={cn(
              "px-3 py-2 rounded-lg bg-blue-400 text-white flex gap-2 items-center bg-gradient-to-r from-[rgba(77,163,166,1)] to-[rgba(204,253,204,1)]",
              (!isDirty || !isValid || postLogin.isPending) && "cursor-no-drop"
            )}
            type={"submit"}
            disabled={!!postLogin.isPending}
          >
            {t("auth.submit")}&nbsp;
            {postLogin.isPending && <Loader className="animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
