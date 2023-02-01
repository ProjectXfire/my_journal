import React, { FC } from "react";
// External libraries
import { Box, Fade, Toolbar } from "@mui/material";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
// Components

interface Props {
  children: JSX.Element;
}

const drawerWidth = 280;

export const JournalLayout: FC<Props> = ({ children }) => {
  return (
    <Fade in timeout={700}>
      <Box sx={{ display: "flex" }}>
        <Navbar drawerWidth={drawerWidth} />
        <Sidebar drawerWidth={drawerWidth} />
        <Box sx={{ flexGrow: 1 }} component="section">
          <Toolbar />
          {children}
        </Box>
      </Box>
    </Fade>
  );
};
