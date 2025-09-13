import { useForm } from "react-hook-form";
import { useSignupMyUser } from "../api/MyUserApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignupPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const { signupMyUserRequest } = useSignupMyUser();
    const [showPassword, setShowPassword] = useState(false);


    const onSubmit = async (data: any) => {
        try {
            await signupMyUserRequest(data);
            navigate("/");
        } catch (error) {
            console.log(error, "Error while signing up. Please try again")
        }
    };

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className="border-[0.1px] border-[#e7e6e6] rounded-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-start px-5 py-4">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl sm:text-2xl font-semibold text-[#0a0a0a]">Create an account</h3>
                        <p className="text-[#737373] text-md w-[35ch]">Enter your email below to create your account</p>
                    </div>       
                    <div className="flex flex-col items-start gap-1 w-full">
                        <label htmlFor="name">Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            placeholder="Full Name"
                            id="name"
                            type="text"
                            className="border-[0.1px] border-[#e7e6e6] py-[5px] px-2 rounded-md w-full focus:outline-none focus:border-[#a09e9e] focus:ring-3 focus:ring-[#d4d4d4] focus:ring-offset placeholder:text-sm placeholder:text-[#0a0a0a8f]"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mb-2">{errors.name.message?.toString()}</p>
                        )}
                    </div>
                     <div className="flex flex-col items-start gap-1 w-full">
                        <label htmlFor="email">Email</label>
                        <input
                            {...register("email", { required: "Email is required" })}
                            placeholder="abc@example.com"
                            id="name"
                            type="text"
                            className="border-[0.1px] border-[#e7e6e6] py-[5px] px-2 rounded-md w-full focus:outline-none focus:border-[#a09e9e] focus:ring-3 focus:ring-[#d4d4d4] focus:ring-offset placeholder:text-sm placeholder:text-[#0a0a0a8f]"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mb-2">{errors.name.message?.toString()}</p>
                        )}
                    </div>
                    <div className="flex flex-col items-start gap-1 w-full relative">
                        <label htmlFor="password">Password</label>
                        <input
                            {...register("password", { required: "Password is required" })}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="border-[0.1px] border-[#e7e6e6] py-[5px] px-2 rounded-md w-full focus:outline-none focus:border-[#a09e9e] focus:ring-3 focus:ring-[#d4d4d4] placeholder:text-sm placeholder:text-[#0a0a0a8f]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-2 text-sm top-9 text-gray-500"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                        {errors.password && (
                            <p className="text-red-500 text-sm mb-2">{errors.password.message?.toString()}</p>
                        )}
                    </div>
                    <button type="submit" className="text-center w-full bg-zinc-800 text-white py-[5px] text-md text-semibold rounded hover:bg-zinc-700 focus:bg-zinc-600 my-2">
                        Sign Up
                    </button>
                    <p className="text-sm text-gray-600 w-full text-center">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-500 underline">
                            Log in
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignupPage