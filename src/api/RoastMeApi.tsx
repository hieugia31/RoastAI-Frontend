import { useState } from 'react';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const useRoastMe = () => {
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [roastData, setRoastData] = useState<any>(null);

  const roastMeRequest = async (prompt: any) => {
    setError(null);
    setSuccess(false);
    setLoading(true);
    setRoastData(null);

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/roast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Internal Server Error');
      }

      const res = await response.json();
      const parsedRoast = res?.roast ? JSON.parse(res.roast) : null;

      setRoastData({ ...parsedRoast, prompt: res.prompt });
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { roastMeRequest, loading, success, error, roastData };
};
