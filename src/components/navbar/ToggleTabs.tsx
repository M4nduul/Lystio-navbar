

import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useHistogram } from '../../context/useHistogram';


export const ToggleTabs = () => {
  const [selected, setSelected] = useState('rent');

  const {setType, type} = useHistogram()

  const setTab = (selected) => {
    setType(selected)
    setSelected(selected)
    console.log(type);
    
  }
  
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        borderRadius: 50,
        overflow: 'hidden',
        bgcolor: '#F7F7FD',
        maxWidth:'324px',
      }}
    >
      <Button
        onClick={() => setTab('rent')}
        
        sx={{
          borderRadius: 999,
          px: 4,
          py: 1,
          bgcolor: selected === 'rent' ? '#A440F1' : 'transparent',
          color: selected === 'rent' ? 'white' : 'black',
          fontWeight: 500,
          textTransform: 'none',
          '&:hover': {
            bgcolor: selected === 'rent' ? '#A440F1' : 'transparent',

          },
        }}
      >
        Rent
      </Button>

      <Button
        onClick={() => setTab('buy')}
        sx={{
          borderRadius: 999,
          px: 4,
          py: 1,
          bgcolor: selected === 'buy' ? '#A440F1' : 'transparent',
          color: selected === 'buy' ? 'white' : 'black',
          fontWeight: 500,
          textTransform: 'none',
          '&:hover': {
            bgcolor: selected === 'buy' ? '#A440F1' : 'transparent',
          },
        }}
      >
        Buy
      </Button>

      <Button
        onClick={() => setSelected('ai')}
        startIcon={<img src='/star.svg' alt='star'/>}
        sx={{
          borderRadius: 999,
          px: 3,
          py: 1,
          bgcolor: selected === 'ai' ? '#A440F1' : 'transparent',
          color: selected === 'ai' ? 'white' : 'black',
          fontWeight: 500,
          textTransform: 'none',
          '&:hover': {
            bgcolor: selected === 'ai' ? '#A440F1' : 'transparent',
          },
        }}
      >
        Lystio A.I
      </Button>
    </Box>
  );
};

