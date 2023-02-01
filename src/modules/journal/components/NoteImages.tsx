import React, { FC, useEffect, useState } from "react";
// External libraries
import { Button, Grid, Typography } from "@mui/material";
import { ImageOutlined } from "@mui/icons-material";
// Models
import { IImagsURL } from "../models";
import { NoteImage } from "./NoteImage";
// Components
import { SnackbarMessage } from "@/modules/shared/components";
// Custom hooks
import { useNoteImages } from "../hooks";

interface Props {
  images: IImagsURL[];
  removingImages: (keep: IImagsURL[], toDelete: IImagsURL[]) => void;
}

export const NoteImages: FC<Props> = ({ images, removingImages }) => {
  //--> Hooks

  const { isOpen, setIsOpen, onSelectedImage, onDeleteImages } = useNoteImages({
    images,
    removingImages,
  });

  //--> Renders

  return (
    <>
      <Grid sx={{ mt: 4 }} container justifyContent="space-between">
        <Typography variant="h4">My images</Typography>
        <Button
          type="button"
          sx={{ mt: 1, mb: 1 }}
          color="error"
          variant="contained"
          startIcon={<ImageOutlined />}
          onClick={onDeleteImages}
        >
          Delete
        </Button>
      </Grid>
      <Grid
        container
        gap={2}
        sx={{ p: 1, mt: 2, border: "1px solid grey", borderRadius: 2 }}
      >
        {images.map((img) => (
          <NoteImage
            key={img.public_id}
            img={img}
            selectedImage={onSelectedImage}
          />
        ))}
      </Grid>
      <SnackbarMessage
        isOpen={isOpen}
        message="Select an image"
        alertColor="warning"
        pos={{ vertical: "bottom", horizontal: "right" }}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
