import { useState } from 'react';
import axios from 'axios';
import { useLayoutEffect } from 'react';

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(dataUrl);
  }, [dataUrl]);

  return { data, fetchError, isLoading, setData };
};

export default useAxiosFetch;
