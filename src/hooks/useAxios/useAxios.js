import { useState } from "react";
import axios from "axios";

function useAxios() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isFirstCall, setIsFirstCall] = useState(true);

  function resetStates() {
    setResponse(null);
    setError("");
    setLoading(true);
  }

  async function requestData(axiosParams) {
    try {
      if (!isFirstCall) {
        resetStates();
      }
      const response = await axios.request(axiosParams);
      setResponse(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      if (isFirstCall) {
        setIsFirstCall(false);
      }
    }
  }

  return { response, error, loading, requestData };
}

export { useAxios };
