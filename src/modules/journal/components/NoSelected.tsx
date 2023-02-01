import React from "react";
// External libraries
import { Grid, Typography } from "@mui/material";
import { StarOutline } from "@mui/icons-material";

export const NoSelected = () => {
  return (
    <Grid
      sx={{
        minHeight: "calc(100vh - 64px)",
        backgroundColor: "primary.main",
      }}
      container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <StarOutline
          sx={{ textAlign: "center", fontSize: 100 }}
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography
          sx={{ textAlign: "center", color: "secondary.main" }}
          variant="h3"
        >
          Select a note
        </Typography>
      </Grid>
    </Grid>
  );
};
