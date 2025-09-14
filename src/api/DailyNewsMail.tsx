import { useState } from 'react';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const useDailyNewsMail = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const dailyNewsMailRequest = async (data: any) => {
    setSuccess(false);
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Internal Server Error');
      }

      setSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
      console.log((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { dailyNewsMailRequest, success, error, loading };
};
