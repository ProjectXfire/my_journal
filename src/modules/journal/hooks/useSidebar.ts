import { useContext, useEffect, useState } from "react";
// External libraries
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
// Models
import { INote } from "../models";
// States
import { RootState, useAppDispatch } from "@/modules/shared/store";
import { PreviewImagesContext, setActiveNote, toggleSidebar } from "../states";

interface SidebarProps {
  variant: "permanent" | "persistent" | "temporary" | undefined;
}

export const useSidebar = () => {
  //--> Hooks

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const dispatch = useAppDispatch();
  const { cleanPreviewImages } = useContext(PreviewImagesContext);
  const { sidebar, notes } = useSelector((state: RootState) => state.journal);
  const { user } = useSelector((state: RootState) => state.auth);
  const [state, setState] = useState<SidebarProps>({
    variant: "permanent",
  });

  //--> Methods

  const onToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const selectNote = (note: INote) => {
    cleanPreviewImages();
    dispatch(setActiveNote(note));
  };

  //--> Effects

  useEffect(() => {
    if (isTabletOrMobile) {
      setState({ variant: "temporary" });
    } else {
      setState({ variant: "permanent" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTabletOrMobile]);

  //--> Return properties or methods

  return {
    ...state,
    user,
    sidebar,
    notes,
    onToggleSidebar,
    selectNote,
  };
};
