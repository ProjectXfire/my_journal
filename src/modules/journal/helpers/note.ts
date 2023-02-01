// External libraries
import axios from "axios";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
// Models
import { IImagsURL, INote } from "../models";
// Firebase config
import { firebaseDB } from "@/modules/shared/database";
// Helpers
import { API_CLOUDINARY } from "@/modules/shared/helpers";

export const onSaving = async (userUid: string, note: INote) => {
  const noteRef = doc(collection(firebaseDB, `${userUid}/journal/notes`));
  await setDoc(noteRef, note);
  note.id = noteRef.id;
  return note;
};

export const onUpdating = async (
  userUid: string,
  note: INote,
  noteId: string
) => {
  const noteRef = doc(firebaseDB, `${userUid}/journal/notes/${noteId}`);
  const noteMap = { ...note };
  await updateDoc(noteRef, noteMap);
  note.id = noteId;
  return note;
};

export const onUploadingImages = async (formData: FormData) => {
  const response = await axios.post<IImagsURL[]>(
    `${API_CLOUDINARY}/cloudinary/upload`,
    formData
  );
  return response.data;
};

export const onDeleting = async (userId: string, note: INote) => {
  const noteRef = doc(firebaseDB, `${userId}/journal/notes/${note.id}`);
  if (note.imageURLs.length > 0) {
    await axios.post(`${API_CLOUDINARY}/cloudinary/delete`, {
      images: note.imageURLs,
    });
  }
  await deleteDoc(noteRef);
};
