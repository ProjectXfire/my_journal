import { useContext, useEffect, useRef } from "react";
// External libraries
import { RootState, useAppDispatch } from "@/modules/shared/store";
import { useSelector } from "react-redux";
// Models
import { IImagsURL, INote } from "../models";
// States
import {
  PreviewImagesContext,
  addNewEmptyNote,
  clearEndTransactionMessage,
  deletingImages,
  deletingNote,
  loadingNotes,
  savingNewNote,
  showEndTransactionMessage,
  toggleDeleteDialog,
} from "../states";
// Helpers
import { imageReader } from "@/modules/shared/helpers";

export const useJournal = () => {
  //--> Hooks

  const inputFilesRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const {
    setPreviewImages,
    cleanPreviewImages,
    state: { previewImages, imagesFormData },
  } = useContext(PreviewImagesContext);
  const { status, user } = useSelector((state: RootState) => state.auth);
  const {
    active,
    openDeleteDialog,
    endTransactionMessage,
    isSaving,
    savingMessage,
  } = useSelector((state: RootState) => state.journal);

  //--> Methods

  const setNewEmptyNote = () => {
    dispatch(addNewEmptyNote());
  };

  const savingNote = (title: string, body: string) => {
    const note: INote = {
      title,
      body,
      imageURLs: active?.imageURLs || [],
      date: active?.date,
    };
    cleanPreviewImages();
    dispatch(savingNewNote(note, imagesFormData));
  };

  const onGetFilesToSave = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files as FileList;
    const files = [];
    for (let i = 0; i < files.length; i++) {
      files.push(fileList[i]);
    }
    const { imageFiles, convertBase64Images, allImagesAreOk } =
      await imageReader(files);
    if (!allImagesAreOk)
      dispatch(
        showEndTransactionMessage({
          message: "Some images exceed the 50Kb limit size",
          color: "error",
        })
      );
    setPreviewImages(convertBase64Images, imageFiles);
  };

  const hideEndTransactionMessage = () => {
    dispatch(clearEndTransactionMessage());
  };

  const showDeleteDialog = () => {
    if (active && active.id) dispatch(toggleDeleteDialog());
  };

  const removingImages = (toKeep: IImagsURL[], toDelete: IImagsURL[]) => {
    dispatch(deletingImages(toKeep, toDelete));
  };

  const removingNote = (action: "yes" | "no") => {
    if (action === "yes" && active && active.id) dispatch(deletingNote());
    dispatch(toggleDeleteDialog());
  };

  //--> Effects

  useEffect(() => {
    if (user) dispatch(loadingNotes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //--> Return properties or methods

  return {
    isSaving,
    savingMessage,
    status,
    active,
    inputFilesRef,
    previewImages,
    openDeleteDialog,
    endTransactionMessage,
    setNewEmptyNote,
    onGetFilesToSave,
    savingNote,
    removingNote,
    removingImages,
    hideEndTransactionMessage,
    showDeleteDialog,
  };
};
