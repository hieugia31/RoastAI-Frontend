import { useForm } from "react-hook-form";

const LoginPage = () => {

     const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm();
    
        const onSubmit = async (data:any) => {
            console.log(data);
    
        };

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className="flex flex-col gap-8">
                <h3 className="sm:text-2xl font-semibold">Login to Your Account</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="Email Address"
                            className="w-full px-6 py-2 border border-gray-300 rounded-lg focus:outline-none transform duration-300 focus:border-gray-800"
                        />
                    </div>
                    {typeof errors.email?.message === "string" && <p className="text-red-500">{errors.email.message}</p>}
                    <div>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            placeholder="Password"
                            className="w-full px-6 py-2 border border-gray-300 rounded-lg focus:outline-none transform duration-300 focus:border-gray-800"
                        />
                    </div>
                    {typeof errors.password?.message === "string" && <p className="text-red-500">{errors.password.message}</p>}
                    <button type="submit" className="bg-zinc-800 text-white text-sm w-fit px-4 py-2 rounded-lg">Login</button>
                </form>
                <p className="text-center text-sm">
                    Don’t have an account?  <a href="/signup" className="text-blue-500 hover:underline">
                        Signup
                    </a>
                </p>
            </div>
        </div>
    )
}

export default LoginPage