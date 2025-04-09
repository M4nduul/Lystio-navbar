
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Slider,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { useHistogram } from '../../context/useHistogram';

export default function PriceRange() {

  const { minPrice, maxPrice, selectedRange, histogram, loading, setSelectedRange  } = useHistogram()

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSelectedRange(newValue as number[]);
  };

  return (
    <Box
      sx={{
        background: 'white',
        borderRadius: 3,
        p: 3,
        width: 500,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Typography fontWeight={600} mb={2}>Price Range</Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
      ) : (
        <Box>
          {/* Histogram Bars */}
          <Box display="flex" height={120} alignItems="flex-end" mb={2}>
            {histogram?.map((value, i) => (
              <Box
                key={i}
                flex={1}
                height={`${value * 20}%`}
                sx={{
                  background: i >= getBucketIndex(selectedRange[0], minPrice, maxPrice, histogram.length) && i <= getBucketIndex(selectedRange[1], minPrice, maxPrice, histogram.length)
                    ? '#A540F3'
                    : '#E4D4F4',
                  borderRadius: 1,
                  mx: 0.2,
                }}
              />
            ))}
          </Box>

          {/* Slider */}
          <Slider
            value={selectedRange}
            min={minPrice}
            max={maxPrice}
            onChange={handleSliderChange}
            sx={{ color: '#A540F3' }}
          />

          {/* Min/Max Fields */}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <TextField
              label="Min"
              value={selectedRange[0]}
              onChange={(e) => setSelectedRange([+e.target.value, selectedRange[1]])}
              InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              }}
              sx={{ width: '45%' }}
            />
            <TextField
              label="Max"
              value={selectedRange[1]}
              onChange={(e) => setSelectedRange([selectedRange[0], +e.target.value])}
              InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              }}
              sx={{ width: '45%' }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

function getBucketIndex(value: number, min: number, max: number, bucketCount: number) {
    const range = max - min;
    const bucketSize = range / bucketCount;
    return Math.min(bucketCount - 1, Math.floor((value - min) / bucketSize));
  }
