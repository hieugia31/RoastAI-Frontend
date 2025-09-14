import { useState } from 'react';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const useFunnyCharacter = () => {
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [funnyCharacterResponse, setFunnyCharacterResponse] =
    useState<any>(null);

  const funnyCharacterRequest = async (
    prompt: string,
    characterName: string
  ) => {
    setError(null);
    setSuccess(false);
    setLoading(true);
    setFunnyCharacterResponse(null);

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/funny-characters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ prompt, characterName }),
      });

      if (!response.ok) {
        throw new Error('Something Went Wrong');
      }

      const data = await response.json();
      const parsedRoast = data?.chatbotReply
        ? JSON.parse(data.chatbotReply)
        : null;

      setFunnyCharacterResponse({ ...parsedRoast, prompt: data.prompt });
      setSuccess(true);
    } catch (error: any) {
      const err = await error?.json();
      setError(err instanceof Error ? err.message : 'Something Went Wrong');
    } finally {
      setLoading(false);
    }
  };

  return {
    funnyCharacterRequest,
    error,
    success,
    loading,
    funnyCharacterResponse,
  };
};
