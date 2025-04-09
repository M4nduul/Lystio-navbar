// @ts-nocheck

import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useWindowSize from "../../utils/useWindowSize";

export const UserMenu = () => {
  const { width, height } = useWindowSize();

  return (
    <Box
      sx={{
        display: "flex",
        direction: "flex-row",
        alignItems: "center",
        gap: 2,
      }}
    >
      {width > 1500 && (
        <Typography sx={{ cursor: "pointer", marginRight: 2 }}>
          List your Property
        </Typography>
      )}
       {width > 1500 && (<>
      <IconButton>
        <img src="/notif.svg" alt="search" />
      </IconButton>
      <Button
        variant="outlined"
        startIcon={<LanguageIcon />}
        sx={{
          borderRadius: 50,
          border: "1px solid #EEE7FF",
          color: "black",
        }}
        >
        EN
      </Button>
        </>)}
      <Typography fontWeight={500}>Sign In</Typography>
      <IconButton disableRipple>
        <Avatar src="src" alt="U" sx={{ width: "32px", height: "32px" }} />
        <KeyboardArrowDownIcon />
      </IconButton>
    </Box>
  );
};
