import React, { FC } from "react";
// External libraries
import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
// Custom hooks
import { useSidebar } from "../hooks";
// Components
import { NoteItem } from "./NoteItem";

interface Props {
  drawerWidth: number;
}

export const Sidebar: FC<Props> = ({ drawerWidth }) => {
  //--> Hooks

  const { user, variant, sidebar, notes, onToggleSidebar, selectNote } =
    useSidebar();

  //--> Renders

  return (
    <Box
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      component="nav"
    >
      <Drawer
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant={variant}
        open={sidebar}
        onClose={onToggleSidebar}
      >
        <Toolbar sx={{ backgroundColor: "primary.main" }}>
          <Typography color="white">{user?.displayName}</Typography>
        </Toolbar>
        <Divider />
        <List disablePadding>
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} selectNote={selectNote} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
