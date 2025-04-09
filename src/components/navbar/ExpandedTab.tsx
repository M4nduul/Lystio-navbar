// @ts-nocheck


import React, { useState } from "react";
import {
  Box,
  Button,
  Menu,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { DropdownSelector } from "./DropdownSelector";
import PriceRange from "./PriceRange";
import MapBoxSearch from "./MapBoxSearch";


export default function ExpandedTab() {
  const [anchorElCat, setAnchorElCat] = useState<null | HTMLElement>(null);
  const [anchorElPrice, setAnchorElPrice] = useState<null | HTMLElement>(null);

  const openLocationCat = Boolean(anchorElCat);
  const openLocationPrice = Boolean(anchorElPrice);


  const handleCloseCat = () => {
    setAnchorElCat(null);
  };
  const handleClosePrice = () => {
    setAnchorElPrice(null);
  };

  const handleLocationOpenCat = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElCat(event.currentTarget);
  };
  const handleLocationOpenPrice = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElPrice(event.currentTarget);
  };


  const [selectedCategoryItems, setSelectedCategoryItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");



  const categories = [
    {
        "id": 2,
        "name": "Apartment"
    },
    {
        "id": 3,
        "name": "House"
    },
    {
        "id": 1,
        "name": "Rooms/Co-Living"
    },
    {
        "id": 4,
        "name": "Plots"
    },
    {
        "id": 20,
        "name": "Office"
    },
    {
        "id": 5,
        "name": "Commercial propety"
    },
    {
        "id": 12,
        "name": "New construction projects"
    },
    {
        "id": 11,
        "name": "Holiday Homes"
    },
    {
        "id": 13,
        "name": "Parking"
    }
];
  const categorySubOptions = [
    "Genossenschaftswohnung",
    "Rohdachboden",
    "Penhouse",
    "Maisonette",
    "Loft/Studio",
    "Dachgeschoss",
  ];

  return (
    <Box display="flex" justifyContent="center" mt={1} p={1} height={"84px"}>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: "999px",
          border: "1px solid #e5e5f0",
          overflow: "hidden",
          width: "80%",
          maxWidth: 1000,
        }}
      >
        {/* Location */}
        <Box
          display="flex"
          alignItems="center"
          px={3}
          py={2}
          flex={1}
          sx={{ borderRight: "1px solid #eee", cursor: "pointer", }}

        >
          <Box margin={1}>
            <img src="/search.svg" alt="search" />
          </Box>
          <Box >
            <Typography fontWeight="600" variant="body2">
              Location
            </Typography>
            <MapBoxSearch  />
          </Box>
        </Box>

        {/* Category */}
        <Box
          display="flex"
          alignItems="center"
          px={3}
          py={2}
          flex={1}
          sx={{ borderRight: "1px solid #eee" }}
          onClick={handleLocationOpenCat}
        >
          <Box margin={1}>
            <img src="/apartment.svg" alt="Apartment" />
          </Box>
          <Box>
            <Typography fontWeight="600" variant="body2">
              Category
            </Typography>
            <Typography variant="body2" color="gray">
              Select Category
            </Typography>
          </Box>
        </Box>
        <Menu
          anchorEl={anchorElCat}
          open={openLocationCat}
          onClose={handleCloseCat}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          sx={{ p: 0 }}
        >

          <DropdownSelector
            options={categories}
            subOptions={categorySubOptions}
            icon={<WorkOutlineIcon />}
            label={`${activeCategory} Types`}
            placeholder="Select category"
            selected={selectedCategoryItems}
            setSelected={setSelectedCategoryItems}
            active={activeCategory}
            setActive={setActiveCategory}
          />
        </Menu>

        {/* Price */}
        <Box
          display="flex"
          alignItems="center"
          px={3}
          py={2}
          flex={1}
          onClick={handleLocationOpenPrice}
        >
          <Box margin={1}>
            <img src="/give.svg" alt="give" />
          </Box>
          <Box>
            <Typography fontWeight="600" variant="body2">
              Price
            </Typography>
            <Typography variant="body2" color="gray">
              Select Price Range
            </Typography>
          </Box>
        </Box>

        <Menu
          anchorEl={anchorElPrice}
          open={openLocationPrice}
          onClose={handleClosePrice}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          sx={{ p: 0 }}
        >
          <PriceRange />
        </Menu>

        {/* Search Button */}
        <Box px={1}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#A540F3",
              borderRadius: "999px",
              px: 3,
              py: 1.5,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#9439D6",
              },
            }}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
