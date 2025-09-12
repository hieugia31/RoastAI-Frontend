import { useState } from "react";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const useFunnyFeud = () => {
    const [error, setError] = useState<null | string>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [funnyFeudResponse, setFunnyFeudResponse] = useState<any>(null);

    const funnyFeudRequest = async ({ AskAnything: prompt, selectedCharacter1, selectedCharacter2 }: any) => {
        setError(null);
        setSuccess(false);
        setLoading(true);
        setFunnyFeudResponse(null);

        try {
            const response = await fetch(`${BACKEND_BASE_URL}/api/funny-debate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ prompt, selectedCharacter1, selectedCharacter2 })
            })

            if (!response.ok) {
                throw new Error("Something Went Wrong");
            }

            const data = await response.json();
            const parsedRoast = data?.chatbotReply ? JSON.parse(data.chatbotReply) : null;

            setFunnyFeudResponse({ parsedRoast, prompt: data?.prompt });
            setSuccess(true);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something Went Wrong")
        } finally {
            setLoading(false);
        }
    }

    return { funnyFeudRequest, error, success, loading, funnyFeudResponse };
}