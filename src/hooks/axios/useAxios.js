import { useState, useEffect } from "react";
import axios from "axios";

function useAxios() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function requestData(axiosParams) {
    try {
      const response = await axios.request(axiosParams);
      setResponse(response.data);
      setError("");
    } catch (error) {
      setError(error.response.data);
      setResponse(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(p =>!p);
  }, [response, error]);

  return { response, error, loading, requestData };
}

export { useAxios };
