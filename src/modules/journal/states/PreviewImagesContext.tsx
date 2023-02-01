import { createContext, ReactNode, useState } from "react";

export interface PreviewImagesState {
  previewImages: string[];
  imagesFormData: FormData | null;
}

const PreviewImagesInitState: PreviewImagesState = {
  previewImages: [],
  imagesFormData: null,
};

interface PreviewImagesContextProps {
  state: PreviewImagesState;
  setPreviewImages: (previewImages: string[], imageFormData: FormData) => void;
  cleanPreviewImages: () => void;
}

export const PreviewImagesContext = createContext(
  {} as PreviewImagesContextProps
);

export const PreviewImagesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  //--> Hooks

  const [state, setState] = useState<PreviewImagesState>(
    PreviewImagesInitState
  );

  //--> Methods

  const setPreviewImages = (
    previewImages: string[],
    imagesFormData: FormData
  ) => {
    setState({ previewImages, imagesFormData });
  };

  const cleanPreviewImages = () => {
    setState({ previewImages: [], imagesFormData: null });
  };

  //--> Renders

  return (
    <PreviewImagesContext.Provider
      value={{ state, setPreviewImages, cleanPreviewImages }}
    >
      {children}
    </PreviewImagesContext.Provider>
  );
};
