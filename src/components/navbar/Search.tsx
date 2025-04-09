// @ts-nocheck


import { Box, Typography } from "@mui/material";

export const Search = () => {
  return (
    <Box
      sx={{
        height: "64px",
        display: "flex",
        padding: "2px",
        m:'2px',
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 12,
        border: "solid #EEE7FF",
        width: "600px",
        cursor: "pointer",
      }}
      id="search-toggle"
    >
      <Box display="flex" alignItems="center">
        <Box margin={2}>
          <img src="/search.svg" alt="search" />
        </Box>
        <Typography fontWeight={500}>Vienna</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Box sx={{ width: "1px", bgcolor: "#EEE7FF", height: "40px" }}></Box>
        <Box margin={2}>
          <img src="/apartment.svg" alt="Apartment" />
        </Box>
        <Typography fontWeight={500}>Apartment</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Box sx={{ width: "1px", bgcolor: "#EEE7FF", height: "40px" }}></Box>
        <Box margin={2}>
          <img src="/give.svg" alt="give" />
        </Box>
        <Typography fontWeight={500} marginRight={1}>
          2.000–5.000€
        </Typography>
        <img src="/search-outlined.svg" alt="search" width="55px" />
      </Box>
    </Box>
  );
};
