import React from "react";
// External libraries
import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
// Custom hooks
import { useJournal } from "../hooks";

export const FloatingButton = () => {
  //--> Hooks

  const { setNewEmptyNote, isSaving } = useJournal();

  //--> Renders

  return (
    <IconButton
      type="button"
      sx={{
        position: "fixed",
        right: 30,
        bottom: 30,
        ":active": {
          transform: "scale(0.9)",
        },
        backgroundColor: "secondary.main",
      }}
      size="small"
      disableRipple
      disabled={isSaving}
      onClick={setNewEmptyNote}
    >
      <Add sx={{ fontSize: 50, color: "white" }} />
    </IconButton>
  );
};
