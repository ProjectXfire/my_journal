import React, { FC } from "react";
// External libraries
import { Fade, Grid, Typography } from "@mui/material";

interface Props {
  title: string;
  children: JSX.Element;
}

export const AuthLayout: FC<Props> = ({ title = "No title", children }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main" }}
    >
      <Fade in timeout={700}>
        <Grid
          item
          sx={{
            width: "95%",
            maxWidth: "500px !important",
            backgroundColor: "white",
            padding: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            {title}
          </Typography>
          {children}
        </Grid>
      </Fade>
    </Grid>
  );
};
