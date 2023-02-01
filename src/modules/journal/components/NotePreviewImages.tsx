import React, { FC } from "react";
import NextImage from "next/image";
// External libraries
import { Grid, Typography } from "@mui/material";

interface Props {
  images: string[];
}

export const NotePreviewImages: FC<Props> = ({ images }) => {
  return (
    <>
      <Typography sx={{ mt: 2 }} variant="h4">
        Preview
      </Typography>
      <Grid container sx={{ mt: 2 }}>
        {images.length > 0 &&
          images.map((img, i) => (
            <Grid
              key={i}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ height: 200, position: "relative" }}
              item
            >
              <NextImage
                style={{ objectFit: "cover" }}
                fill
                src={img}
                alt={img}
                priority
                sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw"
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
};
