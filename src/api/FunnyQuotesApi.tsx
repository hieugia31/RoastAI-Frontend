import { useState } from "react";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const useFunnyQuotes = () => {
    const [error, setError] = useState<null | string>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [funnyQuotesResponse, setFunnyQuotesResponse] = useState<any>(null);

    const FunnyQuotesRequest = async () => {
        setError(null);
        setSuccess(false);
        setLoading(true);
        setFunnyQuotesResponse(null);

        try {
            const response = await fetch(`${BACKEND_BASE_URL}/api/funny-quotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })

            if (!response.ok) {
                throw new Error("Something Went Wrong");
            }

            const data = await response.json();
            const parsedfunnyQuotes = data?.chatbotReply ? JSON.parse(data.chatbotReply) : null;

            setFunnyQuotesResponse(parsedfunnyQuotes);
            setSuccess(true);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something Went Wrong")
        } finally {
            setLoading(false);
        }
    }

    return { FunnyQuotesRequest, error, success, loading, funnyQuotesResponse };
}