import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const HistogramContext = createContext<any>(null); // ✅ FIX

export const HistogramProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState('rent');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedRange, setSelectedRange] = useState([2000, 8000]);
  const [histogram, setHistogram] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistogram = async () => {
      setLoading(true);
      try {
        const response = await axios.post('https://api.lystio.co/tenement/search/histogram', {
          withinId: ['osm:b4:-109166:b9:-1990592'],
          type: [1],
          rentType: [type],
        });

        const { range, histogram } = response.data;
        setMinPrice(range[0]);
        setMaxPrice(range[1]);
        setSelectedRange([range[0], range[1]]);
        setHistogram(histogram);
      } catch (error) {
        console.error('Histogram fetch failed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistogram();
  }, [type]);

  return (
    <HistogramContext.Provider
      value={{
        type,
        setType,
        minPrice,
        maxPrice,
        selectedRange,
        setSelectedRange,
        histogram,
        loading,
      }}
    >
      {children}
    </HistogramContext.Provider>
  );
};

export const useHistogram = () => {
  const context = useContext(HistogramContext);
  if (!context) throw new Error('useHistogram must be used within a HistogramProvider');
  return context;
};
