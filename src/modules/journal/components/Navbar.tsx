import React, { FC } from "react";
// External libraries
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
// Custom hooks
import { useNavbar } from "../hooks";

interface Props {
  drawerWidth: number;
}

export const Navbar: FC<Props> = ({ drawerWidth }) => {
  //--> Hooks

  const { onToggleSidebar, onLogout } = useNavbar();

  //--> Renders

  return (
    <AppBar
      position="fixed"
      sx={{ width: { md: `calc(100% - ${drawerWidth}px)` } }}
    >
      <Toolbar>
        <IconButton
          type="button"
          color="info"
          edge="start"
          sx={{ mr: 2, display: { md: "none" } }}
          onClick={onToggleSidebar}
        >
          <MenuOutlined />
        </IconButton>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Journal</Typography>
          <IconButton type="button" color="info" onClick={onLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
