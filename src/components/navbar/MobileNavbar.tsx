import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  InputAdornment,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ToggleTabs } from "./ToggleTabs";
import { Logo } from "./Logo";

const destinations = [
  { icon: "📍", title: "Nearby", desc: "Find what’s around you" },
  {
    icon: "🎼",
    title: "Vienna, Austria",
    desc: "City of music and imperial history",
  },
  {
    icon: "🏰",
    title: "Salzburg, Austria",
    desc: "Birthplace of Mozart and baroque beauty",
  },
  {
    icon: "🏞️",
    title: "Hallstatt, Austria",
    desc: "Fairy-tale alpine village",
  },
  {
    icon: "🌄",
    title: "Innsbruck, Austria",
    desc: "Alpine city for winter sports lovers",
  }
];

export default function MobileNavbar() {
  return (
    <Box
      sx={{
        p: 2,
        background: "#fff",
        borderRadius: 4,
        maxWidth: 500,
        mx: "auto",
      }}
    >
      {/* Tabs */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ToggleTabs />
      </Box>

      {/* Header */}
      <Typography variant="h5" fontWeight="bold" mt={2}>
        <Logo />
      </Typography>

      {/* Search Box */}

      <TextField
        fullWidth
        placeholder="Search destinations"
        variant="outlined"
        sx={{ mt: 2, borderRadius: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          sx: { borderRadius: "12px", background: "#f2f2f2", height: 45 },
        }}
      />

      {/* Suggestions */}
      <Typography variant="subtitle2" mt={3} mb={1} color="text.secondary">
        Suggested destinations
      </Typography>
      <List>
        {destinations.map((item, idx) => (
          <ListItem key={idx} sx={{ px: 0 }}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "#f1f1f1", color: "black" }}>
                {item.icon}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography fontWeight={600}>{item.title}</Typography>}
              secondary={item.desc}
            />
          </ListItem>
        ))}
      </List>

      {/* Footer inputs */}
      <Box mt={2} display="flex" flexDirection="column" gap={1}>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            justifyContent: "space-between",
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          <span>When</span>
          <span style={{ color: "#888" }}>Add dates</span>
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            justifyContent: "space-between",
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          <span>Who</span>
          <span style={{ color: "#888" }}>Add guests</span>
        </Button>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={1}
        >
          <Button
            variant="text"
            sx={{ textTransform: "none", fontWeight: "bold", color: "grey" }}
          >
            Clear all
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              borderRadius: 3,
              textTransform: "none",
              background: "#A540F3",
            }}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
