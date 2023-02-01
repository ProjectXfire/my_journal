import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";
// External libraries
import { CircularProgress, Grid, Typography } from "@mui/material";
// States
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface Props {
  message?: string;
}

export const Loading: FC<Props> = ({ message = "" }) => {
  //--> Hooks

  const router = useRouter();
  const { status } = useSelector((state: RootState) => state.auth);

  //--> Effects

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
    if (status === "not-authenticated") {
      router.push("/login");
    }
  }, [status, router]);

  //--> Renders

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main" }}
    >
      <CircularProgress size={40} color="secondary" />
      {message && (
        <Typography sx={{ mt: 2, fontSize: 20, color: "secondary.main" }}>
          {message}
        </Typography>
      )}
    </Grid>
  );
};
