import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Popover,
  Divider,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  TextField,
  IconButton,
  Avatar,
  Grid,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import axios from "axios";

interface District {
  id: string;
  name: string;
  postalCode: string;
}

interface City {
  id: string;
  name: string;
  image: string;
  districts: District[];
}

const API = "https://api.lystio.co/";
const LocationPopover = ({ anchorEl, open, onClose }: any) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [recentRes, citiesRes] = await Promise.all([
        axios.get(API + "geo/search/recent"),
        axios.get(API + "geo/boundary/popular"),
      ]);
      setRecentSearches(recentRes.data);
      const citiesWithDistricts = citiesRes.data.map((city: any) => ({
        ...city,
        image: city.image || "/vienna.jpg",
      }));
      setCities(citiesWithDistricts);
      setSelectedCity(citiesWithDistricts[0]);
      console.log(recentRes);
      console.log(citiesRes);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const toggleDistrict = (id: string) => {
    setSelectedDistricts((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedCity) {
      const allIds = selectedCity.districts.map((d) => d.id);
      setSelectedDistricts(allIds);
    }
  };

  const leftPaneWidth = 280;
  const rightPaneWidth = 320;

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{
        sx: { width: leftPaneWidth + rightPaneWidth + 1, display: "flex" },
      }}
    >
      {loading ? (
        <Box p={3}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box width={leftPaneWidth} p={2}>
            <Typography fontSize={12} fontWeight={600} mb={1}>
              Current Location
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              mb={2}
              sx={{ cursor: "pointer" }}
            >
              <img src="/location.svg" alt="location" />
              <Typography fontSize={14}>Current location</Typography>
            </Box>
            <Typography fontSize={12} fontWeight={600} mb={1} display={'flex'}>
              Recent Searches
            </Typography>
            <List dense>
              {recentSearches.map((item, index) => (
                <ListItem key={index} sx={{ pl: 0 }}>
                  <ListItemIcon>
                    <LocationOnOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{ fontSize: 14 }}
                  />
                </ListItem>
              ))}
            </List>
            <Typography fontSize={12} fontWeight={600} mt={2} mb={1} display={'flex'}>
              Popular Cities
            </Typography>
            <Grid container spacing={1}>
              {cities.map((city, i) => (
                // @ts-ignore
                <Grid item xs={6} key={city.id}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      borderRadius: 2,
                      p: 1,
                      bgcolor:
                        selectedCity?.id === city.id
                          ? "#f0f0f0"
                          : "transparent",
                    }}
                    onClick={() => setSelectedCity(city)}
                  >
                    <Avatar
                      src={city.image}
                      sx={{ width: 32, height: 32, mr: 1 }}
                    />
                    <Typography fontSize={14}>{city.name}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider orientation="vertical" flexItem />

          <Box width={rightPaneWidth} p={2}>
            <Typography fontSize={12} fontWeight={600} mb={1}>
              Districts in {selectedCity?.name}
            </Typography>
            <Typography
              fontSize={12}
              color="primary"
              sx={{ cursor: "pointer", mb: 1 }}
              onClick={selectAll}
            >
              Select All
            </Typography>
            <List dense>
              {selectedCity?.districts?.map((district) => (
                <ListItem
                  key={district.id}
                  sx={{ pl: 0 }}
                  onClick={() => toggleDistrict(district.id)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedDistricts.includes(district.id)}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${district.name} (${district.postalCode})`}
                    primaryTypographyProps={{ fontSize: 14 }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </>
      )}
    </Popover>
  );
};

export default LocationPopover;
