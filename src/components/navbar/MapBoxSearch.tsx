// @ts-nocheck

import axios from 'axios';
import React, { useState } from 'react';
import { Box, ClickAwayListener, InputBase } from '@mui/material';
import { DropdownLocation } from './DropdownLocation';
import { usePopularCities } from '../../utils/usePopularCities';

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const SearchURL = "https://api.mapbox.com/search/geocode/v6/forward"

const MapboxSearch = () => { 
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [activeLocation, setActiveLocation] = useState("Vienna");

  const [query, setQuery] = useState('');
  const [ suggestions, setSuggestions] = useState([]);
  const { popularCities, loading, error } =  usePopularCities()

  const fetchData = async (value)=> {
    const { data } = await axios({
      method: 'GET',
      url: SearchURL,
      params: {
        q: value, 
        access_token: MAPBOX_ACCESS_TOKEN,
        autocomplete: true,
        limit: 5,
        country: 'at',
        language: 'de'
      },
    });
    setSuggestions(data.features)
    
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setAnchorEl(e.currentTarget)
    fetchData(value)
      
  };
  
  const handleClickAway = () => {
    setAnchorEl(null);
  };


  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
      <InputBase
        type="text"
        id="basic-input"
        value={query}
        onChange={handleInputChange}
        placeholder="Location"
        onClick={(e)=> {setAnchorEl(e.currentTarget)}}
        />
         
        {Boolean(anchorEl) && (
          <Box  sx={{
            position: 'absolute',
            marginTop: 3,
            marginLeft:'-60px'
          }}>

          <DropdownLocation
          suggestions={suggestions}
          cities={popularCities}
          selected={selectedDistricts}
          setSelected={setSelectedDistricts}
          active={activeLocation}
          setActive={setActiveLocation}
          />
        </Box>
        )

        }

      </Box>
        </ClickAwayListener>

  );
};

export default MapboxSearch;
