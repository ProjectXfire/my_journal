// External libraries
import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import axios from "axios";
// Models
import { IImagsURL, INote } from "../models";
// Firebase config
import { firebaseDB } from "@/modules/shared/database";
// States
import { AppDispatch, RootState } from "@/modules/shared/store";
import {
  deleteNote,
  savingNote,
  setError,
  setNotes,
  startSaving,
  updateNote,
  updateImages,
} from "./JournalSlice";
// Helpers
import { API_CLOUDINARY } from "@/modules/shared/helpers";
import {
  onDeleting,
  onSaving,
  onUpdating,
  onUploadingImages,
} from "../helpers";

export const loadingNotes = () => {
  return async (dispatch: AppDispatch, getStates: () => RootState) => {
    try {
      const { user } = getStates().auth;
      if (!user) throw new Error("User not exist, try login again");
      const notesRef = collection(firebaseDB, `${user.uid}/journal/notes`);
      const q = query(notesRef, orderBy("date", "desc"));
      const docs = await getDocs(q);
      const notes: INote[] = [];
      docs.forEach((doc) => {
        const note: INote = {
          id: doc.id,
          ...(doc.data() as INote),
        };
        notes.push(note);
      });
      dispatch(setNotes(notes));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
};

export const savingNewNote = (note: INote, imagesData?: FormData | null) => {
  return async (dispatch: AppDispatch, getStates: () => RootState) => {
    try {
      const { user } = getStates().auth;
      const { active } = getStates().journal;
      if (!user) throw new Error("User not exist, try login again");
      if (!active) throw new Error("Any note selected");
      if (!active.id) {
        dispatch(startSaving("Saving note..."));
        const newNote = await onSaving(user.uid, note);
        dispatch(savingNote(newNote));
      } else {
        dispatch(startSaving("Updating note..."));
        if (imagesData) {
          const imagesURL = await onUploadingImages(imagesData);
          note.imageURLs = [...note.imageURLs, ...imagesURL];
        }
        const updatedNote = await onUpdating(user.uid, note, active.id);
        dispatch(updateNote(updatedNote));
      }
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
};

export const deletingImages = (
  keepImages: IImagsURL[],
  removeImages: IImagsURL[]
) => {
  return async (dispatch: AppDispatch, getStates: () => RootState) => {
    try {
      const { user } = getStates().auth;
      const { active } = getStates().journal;
      if (!user) throw new Error("User not exist, try login again");
      if (!active) throw new Error("Any note selected");
      if (!active.id) throw new Error("Save first the note");
      dispatch(startSaving("Deleting images..."));
      await axios.post(`${API_CLOUDINARY}/cloudinary/delete`, {
        images: removeImages,
      });
      const updatedNoteImages = { ...active };
      delete updatedNoteImages.id;
      updatedNoteImages.imageURLs = keepImages;
      const updatedNote = await onUpdating(
        user.uid,
        updatedNoteImages,
        active.id
      );
      dispatch(updateImages(updatedNote));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
};

export const deletingNote = () => {
  return async (dispatch: AppDispatch, getStates: () => RootState) => {
    try {
      const { user } = getStates().auth;
      const { active } = getStates().journal;
      if (!user) throw new Error("User not exist, try login again");
      if (!active) throw new Error("Any note selected");
      if (!active.id) throw new Error("Save first the note");
      dispatch(startSaving("Deleting note..."));
      await onDeleting(user.uid, active);
      dispatch(deleteNote(active.id));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
};
