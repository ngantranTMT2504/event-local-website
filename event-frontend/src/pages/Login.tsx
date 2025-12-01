import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import axiosClient from "@/api/axiosClient";


export default function Login() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const {register, handleSubmit} = useForm();

  const submit = async (data: any) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", data.email);
      formData.append("password", data.password);

      const res = await axiosClient.post("/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      auth?.login(res.data.access_token);
      console.log("token:" + auth?.token);
      
      toast.success("đăng nhập thành công");
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Sai email hoặc mật khẩu");
    }
  };

  return (
    <div className="bg-neutral-secondary border-1  shadow-md max-w-sm mx-auto p-10 my-10 rounded-xl">
      <h4 className="text-center font-medium text-3xl mb-5 text-primary">
        Welcome!!
      </h4>
      <form className="" onSubmit={handleSubmit(submit)}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="email@gmail.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="••••••••"
            required
          />
        </div>
        <label htmlFor="remember" className="flex items-center mb-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-1 focus:ring-brand-soft"
            required
          />
          <p className="ms-2 text-sm font-medium text-heading select-none">
            Tôi đồng ý{" "}
            <a href="#" className="text-fg-brand hover:underline">
              terms and conditions
            </a>
            .
          </p>
        </label>
        <div className="flex justify-center">
          <Button type="submit" variant="default" className="w-full">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
