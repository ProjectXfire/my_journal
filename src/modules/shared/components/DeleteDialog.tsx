import React, { FC, useMemo } from "react";
// External libraries
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface Props {
  title?: string;
  isOpen: boolean;
  onClose: (action: "yes" | "no") => void;
}

export const DeleteDialog: FC<Props> = ({ isOpen, onClose, title = "" }) => {
  //--> Hooks

  const titleLength = useMemo(() => {
    return title.length > 30 ? `${title.substring(0, 30)} ...` : title;
  }, [title]);

  //--> Renders

  return (
    <Dialog open={isOpen}>
      {title && <DialogTitle>{titleLength}</DialogTitle>}
      <DialogContent>
        <DialogContentText>
          You are trying to delete this, are you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          onClick={() => onClose("yes")}
        >
          Yes
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => onClose("no")}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};
