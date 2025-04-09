

import { AppBar, Box, Button, ClickAwayListener, Collapse, Container } from "@mui/material";
import { Search, Logo, UserMenu, ToggleTabs } from ".";
import { useEffect, useState } from "react";
import ExpandedTab from "./ExpandedTab";
import React from "react";


const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

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
    setIsExpanded(false)

  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
    
    <AppBar
      position="fixed"
      id="close-toggle"
      color="inherit"
      sx={{ py: 1, borderBottom: "1px solid #EEE7FF" }}
    >
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
          <Box sx={{
            marginLeft: {
              lg: 40
            }
          }}>
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
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>       
          <ExpandedTab />
      </Collapse>
    </AppBar>
    </ClickAwayListener>
  );
};

export default Navbar;
