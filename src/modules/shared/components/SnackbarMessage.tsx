import { Alert, AlertColor, Snackbar } from "@mui/material";
import React, { FC } from "react";

interface Props {
  message: string;
  isOpen: boolean;
  pos?: { vertical: "top" | "bottom"; horizontal: "center" | "left" | "right" };
  alertColor?: AlertColor;
  onClose: () => void;
}

export const SnackbarMessage: FC<Props> = ({
  isOpen,
  onClose,
  message,
  pos = { vertical: "top", horizontal: "right" },
  alertColor = "success",
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: pos.vertical, horizontal: pos.horizontal }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        elevation={6}
        severity={alertColor}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
