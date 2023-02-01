import { useEffect, useState } from "react";
// Models
import { IImagsURL } from "../models";

interface Props {
  images: IImagsURL[];
  removingImages: (keep: IImagsURL[], toDelete: IImagsURL[]) => void;
}

export const useNoteImages = ({ images, removingImages }: Props) => {
  //--> Hooks

  const [imgsToDelete, setImgsToDelete] = useState<IImagsURL[]>([]);
  const [imgsToKeep, setImgsToKeep] = useState<IImagsURL[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  //--> Methods

  const onDeleteImages = () => {
    if (imgsToDelete.length === 0) return setIsOpen(true);
    removingImages(imgsToKeep, imgsToDelete);
  };

  const onSelectedImage = (img: IImagsURL, active: boolean) => {
    if (active) {
      setImgsToDelete((cv) => [...cv, img]);
      setImgsToKeep((cv) => cv.filter((v) => v.public_id !== img.public_id));
    } else {
      setImgsToDelete((cv) => cv.filter((v) => v.public_id !== img.public_id));
      setImgsToKeep((cv) => [...cv, img]);
    }
  };

  //--> Effects

  useEffect(() => {
    setImgsToKeep(images);
  }, [images]);

  //--> Return properties or methods

  return {
    isOpen,
    setIsOpen,
    onSelectedImage,
    onDeleteImages,
  };
};
