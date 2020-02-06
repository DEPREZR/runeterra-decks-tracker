import { getCurrentDeck } from "gameApiHelpers";
import { useState, useEffect } from "react";

const useGetCurrentDeck = () => {
  const [result, setResult] = useState({
    data: null,
    error: null,
    status: null,
    loading: true
  });

  const callback = async () => {
    if (!result.loading)
      setResult(previousResult => ({ ...previousResult, loading: true }));
    const response = await getCurrentDeck();
    if (response.hasError) {
      setResult({
        data: null,
        error: response.error,
        status: response.status,
        loading: false
      });
    } else {
      try {
        const data = await response.json();

        setResult({
          data,
          error: null,
          status: response.status,
          loading: false
        });
      } catch (error) {
        setResult({
          data: null,
          error,
          status: response.status,
          loading: false
        });
      }
    }
  };

  useEffect(
    () => {
      callback();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  console.log(result);

  return result;
};

export default useGetCurrentDeck;
