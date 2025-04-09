// @ts-nocheck

import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const DropdownLocation = ({
  cities,
  selected,
  setSelected,
  active,
  setActive,
  suggestions,
}) => {
  const handleToggle = (option) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };
  

  const [subOptions, setSubOptions] = useState(null)
  const handleSelectAll = () => {
    if (subOptions && selected.length === subOptions.length) {
      setSelected([]);
    } else {
      setSelected([...subOptions]);
    }
  };

  const selectedCity = (city)=> {
    setActive(city.name)
    setSubOptions(city.children)
  }

  const clickSuggestion = (clicked) => {
    setActive(clicked)
    setSubOptions(null)
  }

  return (
    <Box display="flex" width={700}>
      <Box
        width="60%"
        sx={{ border: "1px solid #eee", background: "#fff", borderStartStartRadius:'12px', 
          maxHeight: "600px",
          overflowY: "auto"
        }}
      >
        {suggestions.length > 0 && (
          <Box mt={2}>
            <Typography fontWeight={500} color="grey" fontSize={"14px"} ml={2}>
              Search Result
            </Typography>
            <List>
              {suggestions?.map((suggestion) => (
                <ListItem
                  button
                  key={suggestion.properties.full_address}
                  onClick={() => clickSuggestion(suggestion.properties.full_address)}
                  sx={{
                    backgroundColor:
                      active === suggestion.properties.full_address
                        ? "#F7F7FD"
                        : "transparent",
                    borderLeft:
                      active === suggestion.properties.full_address
                        ? "2px solid #A540F3"
                        : "2px solid transparent",
                  }}
                  secondaryAction={
                    active === suggestion.properties.full_address ? (
                      <ChevronRightIcon sx={{ color: "#A540F3" }} />
                    ) : null
                  }
                >
                  <ListItemIcon sx={{ color: "#A540F3" }}>
                    <LocationOnIcon/>
                  </ListItemIcon>
                  <ListItemText primary={suggestion.properties.full_address} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

      <Box mt={2}>
            <Typography fontWeight={500} color="grey" fontSize={"14px"} ml={2}>
              Popular Cities
            </Typography>
        <List>
          {cities?.map((city) => (
            <ListItem
              button
              key={city.name}
              onClick={() => selectedCity(city)}
              sx={{
                backgroundColor: active === city.name ? "#F7F7FD" : "transparent",
                borderLeft:
                  active === city.name
                    ? "2px solid #A540F3"
                    : "2px solid transparent",
              }}
              secondaryAction={
                active === city.name ? (
                  <ChevronRightIcon sx={{ color: "#A540F3" }} />
                ) : null
              }
            >
              <ListItemIcon>
                <img src={`/${city.name}.svg`} alt={city.name} />
              </ListItemIcon>
              <ListItemText primary={city.name} />
            </ListItem>
          ))}
        </List>
      </Box>
      </Box>
      {
        subOptions &&
        <Box width="40%" sx={{ p: 2, background: "#fff", border:'1px solid #eee', borderStartEndRadius: '12px',
           maxHeight: "500px",
          overflowY: "auto"
        }}>
         <Typography fontWeight={500} color="grey" fontSize={"14px"} ml={2}>
              Discricts in {active}
            </Typography>
          <List dense>
            <ListItem button onClick={handleSelectAll}>
              <ListItemIcon>
                <Checkbox
                  checked={selected.length === subOptions.length}
                  indeterminate={
                    selected.length > 0 && selected.length < subOptions.length
                  }
                  sx={{
                    color: "#A540F3",
                    "&.Mui-checked": { color: "#A540F3" },
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={`Select All`} />
            </ListItem>
            {subOptions && subOptions?.map((item) => (
              <ListItem key={item.id} button onClick={() => handleToggle(item.name)}>
                <ListItemIcon>
                  <Checkbox
                    checked={selected.includes(item.name)}
                    sx={{
                      color: "#A540F3",
                      "&.Mui-checked": { color: "#A540F3" },
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      }
    </Box>
  );
};
