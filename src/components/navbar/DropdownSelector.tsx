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

export const DropdownSelector = ({
  options,
  subOptions,
  icon,
  label,
  placeholder,
  selected,
  setSelected,
  active,
  setActive,
}) => {
  const handleToggle = (option) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleSelectAll = () => {
    if (selected.length === subOptions.length) {
      setSelected([]);
    } else {
      setSelected([...subOptions]);
    }
  };

  return (
    <Box display="flex" width={700}>
      <Box
        width="40%"
        sx={{ borderRight: "1px solid #eee", background: "#fff" }}
      >
        <List>
          {options.map((option) => (
            <ListItem
              button
              key={option.name}
              onClick={() => setActive(option.name)}
              sx={{
                backgroundColor:
                  active === option.name ? "#F7F7FD" : "transparent",
                borderLeft:
                  active === option.name
                    ? "2px solid #A540F3"
                    : "2px solid transparent",
              }}
              secondaryAction={
                active === option.name ? (
                  <ChevronRightIcon sx={{ color: "#A540F3" }} />
                ) : null
              }
            >
              <ListItemIcon sx={{ color: "#A540F3" }}>{icon}</ListItemIcon>
              <ListItemText primary={option.name} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box width="60%" sx={{ p: 2, background: "#fff" }}>
        <Typography fontWeight={500} color="grey" fontSize={"14px"} ml={2}>
          {label}
        </Typography>
        <List dense>
          <ListItem button onClick={handleSelectAll}>
            <ListItemIcon>
              <Checkbox
                checked={selected.length === subOptions.length}
                indeterminate={
                  selected.length > 0 && selected.length < subOptions.length
                }
                sx={{ color: "#A540F3", "&.Mui-checked": { color: "#A540F3" } }}
              />
            </ListItemIcon>
            <ListItemText primary={`Select All`} />
          </ListItem>
          {subOptions.map((item) => (
            <ListItem key={item} button onClick={() => handleToggle(item)}>
              <ListItemIcon>
                <Checkbox
                  checked={selected.includes(item)}
                  sx={{
                    color: "#A540F3",
                    "&.Mui-checked": { color: "#A540F3" },
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};
