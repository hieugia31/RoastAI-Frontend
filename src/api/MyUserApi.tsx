import { useState } from "react"

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const useLoginMyUser = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);

    const loginMyUserRequest = async (data: any) => {
        setSuccess(false);
        setError(null);
        setLoading(true);

        try {
            const response = await fetch("/api/backend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error("Failed to login");
            }

            setSuccess(true);
            return await response.json()
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return { success, error, loading, loginMyUserRequest }
}

export const useSignupMyUser = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);

    const signupMyUserRequest = async (data: any) => {
        setSuccess(false);
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(`${BACKEND_BASE_URL}/api/users/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error("Failed to signup");
            }

            setSuccess(true)
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return { success, error, loading, signupMyUserRequest }
}

export const useGetUser = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);

    const getUserRequest = async () => {
        setSuccess(false);
        setError(null);
        setLoading(true);
        setUser(null);

        try {
            const response = await fetch(`${BACKEND_BASE_URL}/api/users/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            if (!response.ok) {
                throw new Error("Internal server error")
            }

            const data = await response.json();
            setUser(data);
            setSuccess(true);
            return data;
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setLoading(false)
        }
    }

    return { getUserRequest, success, error, loading, user }
}