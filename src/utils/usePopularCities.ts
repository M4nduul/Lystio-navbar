import { useEffect, useState } from 'react';
import axios from 'axios';

export const usePopularCities = () => {
  const [popularCities, setPopularCities] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://api.lystio.co/geo/boundary/popular');
        setPopularCities(res.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load geo data');
      } finally {
        setLoading(false);
      }
      
    };

    fetchData();
  }, []);

  return { popularCities, loading, error };
};
