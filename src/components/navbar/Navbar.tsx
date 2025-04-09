import {
  AppBar,
  Box,
  Button,
  ClickAwayListener,
  Collapse,
  Container,
  IconButton,
  Menu,
  Typography,
} from "@mui/material";
import { Search, Logo, UserMenu, ToggleTabs } from ".";
import { Suspense, useEffect, useState } from "react";
import ExpandedTab from "./ExpandedTab";
import React from "react";
import useWindowSize from "../../utils/useWindowSize";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { width, height } = useWindowSize();
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsExpanded(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClickAway = () => {
    setIsExpanded(false);
  };

  const handleOpenSearch = () => {
    setShowMobileNav(true);
  };

  const handleClickAwayMobile = () => {
    setShowMobileNav(false);
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <AppBar
        position="fixed"
        id="close-toggle"
        color="inherit"
        sx={{ py: 1, borderBottom: "1px solid #EEE7FF" }}
      >
        {width > 600 ? (
          <Container maxWidth={false}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginX: "10px",
                justifyContent: "space-between",
                gap: 3,
              }}
            >
              <Logo />
              <Box
                sx={{
                  marginLeft: width / 50,
                  margin: {
                    md: 0,
                    sm: 0,
                  },
                }}
              >
                {isExpanded ? (
                  <ToggleTabs />
                ) : (
                  <Box onClick={() => setIsExpanded(!isExpanded)}>
                    <Search />
                  </Box>
                )}
              </Box>

              <UserMenu />
            </Box>
          </Container>
        ) : !showMobileNav ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              cursor: "pointer",
            }}
          >
            <Logo />

            <Button
              disableFocusRipple
              disableRipple
              disableTouchRipple
              sx={{
                // height: "64px",
                display: "flex",
                padding: "2px",

                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 12,
                border: "solid #EEE7FF",
                cursor: "pointer",
                height: "60px",
              }}
              onClick={handleOpenSearch}
            >
              <Box display="flex" alignItems="center">
                <Box margin={2}>
                  <img src="/search.svg" alt="search" />
                </Box>
                <Typography fontWeight={500}></Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{ width: "1px", bgcolor: "#EEE7FF", height: "40px" }}
                ></Box>
                <Box margin={2}>
                  <img src="/apartment.svg" alt="Apartment" />
                </Box>
                <Typography fontWeight={500}></Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{ width: "1px", bgcolor: "#EEE7FF", height: "40px" }}
                ></Box>
                <Box margin={2}>
                  <img src="/give.svg" alt="give" />
                </Box>
                <Typography fontWeight={500} marginRight={1}></Typography>
                <img src="/search-outlined.svg" alt="search" width="55px" />
              </Box>
            </Button>
          </Box>
        ) : (
          <ClickAwayListener onClickAway={handleClickAwayMobile}>
            <Box>
              <MobileNavbar />
            </Box>
          </ClickAwayListener>
        )}

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <ExpandedTab />
        </Collapse>
      </AppBar>
    </ClickAwayListener>
  );
};

export default Navbar;
