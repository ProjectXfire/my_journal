import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import React, { FC } from "react";

interface Props {
  message: string;
  isOpen: boolean;
}

export const SavingAction: FC<Props> = ({ message, isOpen }) => {
  return (
    <Modal open={isOpen}>
      <Box
        sx={{
          minWidth: 200,
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          top: "50%",
          left: "50%",
          p: 2,
          transform: "translate(-50%, -50%)",
          background: "white",
          borderRadius: 4,
        }}
      >
        <CircularProgress color="secondary" size={50} />
        <Typography sx={{ mt: 2, fontSize: 20 }}>{message}</Typography>
      </Box>
    </Modal>
  );
};
