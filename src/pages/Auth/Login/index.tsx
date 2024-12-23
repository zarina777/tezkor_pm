import { removeAll } from "@/services/api";
import useUserStore from "@/store/useUserData";
import { useEffect } from "react";
import LoginForm from "./LoginForm";
const Login = () => {
  const { saveUserData } = useUserStore();
  useEffect(() => {
    saveUserData(undefined);
    removeAll();
    return;
  }, []);
  console.log("lorem");

  return (
    <div className="grid md:grid-cols-2 place-items-center sm:max-xl:grid-cols-1 h-screen relative">
      <div className="w-full h-full flex justify-center items-center">
        <div className="max-w-[360px] w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
