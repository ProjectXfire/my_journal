import React, { FC, useState } from "react";
import NextImage from "next/image";
// Models
import { IImagsURL } from "@/modules/journal/models";
import { Checkbox, Grid } from "@mui/material";

interface Props {
  img: IImagsURL;
  selectedImage: (img: IImagsURL, active: boolean) => void;
}

export const NoteImage: FC<Props> = ({ img, selectedImage }) => {
  //--> Hooks

  const [isSelected, setIsSelected] = useState(false);

  //--> Methods

  const onSelectImage = () => {
    setIsSelected(!isSelected);
    selectedImage(img, !isSelected);
  };

  //--> Renders

  return (
    <Grid
      key={img.public_id}
      xs={12}
      sm={6}
      md={4}
      lg={3}
      sx={{ height: 200, position: "relative" }}
      item
    >
      <Checkbox
        sx={{ position: "absolute", zIndex: 10 }}
        color="error"
        checked={isSelected}
        size="medium"
        onChange={onSelectImage}
      />
      <NextImage
        style={{ objectFit: "cover", borderRadius: 10, opacity: 0.9 }}
        fill
        src={img.secure_url}
        alt="image"
        priority
        sizes="(max-width: 768px) 100vw,
  (max-width: 1200px) 50vw,
  33vw"
      />
    </Grid>
  );
};
