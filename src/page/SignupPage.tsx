import { useForm } from "react-hook-form";
import { useSignupMyUser } from "../api/MyUserApi";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const {  signupMyUserRequest } = useSignupMyUser()

    const onSubmit = async (data: any) => {
        try {
            await signupMyUserRequest(data);
            navigate("/");
        } catch (error) {
            console.log(error,"Error while signing up. Please try again")
        }
    };

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className="flex flex-col gap-8">
                <h3 className="sm:text-2xl font-semibold">Create an Account</h3>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5">
                    <div>
                        <input
                            {...register("name", { required: "Name is required" })}
                            placeholder="Full Name"
                            className="w-full px-6 py-2 border border-gray-300 rounded-lg focus:outline-none transform duration-300 focus:border-gray-800"
                        />
                    </div>
                    {typeof errors.name?.message === "string" && <p className="text-red-500">{errors.name.message}</p>}
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
                    <button type="submit" className="bg-zinc-800 text-white text-sm w-fit px-4 py-2 rounded-lg">Signup</button>
                </form>
                <p className="text-center text-sm">
                    have an account?  <a href="/login" className="text-blue-500 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    )
}

export default SignupPage