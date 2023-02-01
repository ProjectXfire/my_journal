import { IUser } from "@/modules/auth/models";
import { INote } from "@/modules/journal/models";
import { IState } from "@/modules/journal/states";

export const demoNote: INote = {
  id: "123",
  title: "test",
  body: "test",
  imageURLs: [],
  date: new Date().getTime(),
};

export const demoNewNote: INote = {
  title: "test",
  body: "test",
  imageURLs: [],
  date: new Date().getTime(),
};

export const demoNewNoteWithId: INote = {
  ...demoNewNote,
  id: "demoNewNote",
};

export const demoNote2: INote = {
  ...demoNote,
  id: "345",
};

export const demoNoteUpdated: INote = {
  ...demoNote,
  title: "test updated",
  body: "bodyUpdated",
};

export const demoNotes: INote[] = [demoNote, demoNote2];

export const initState: IState = {
  sidebar: false,
  isSaving: false,
  openDeleteDialog: false,
  savingMessage: "",
  endTransactionMessage: null,
  notes: [],
  active: null,
};

export const txnMessage: IState = {
  ...initState,
  endTransactionMessage: {
    color: "success",
    message: "message",
  },
};

export const clearTxnMessage: IState = {
  ...initState,
  endTransactionMessage: null,
};

export const processingSavingNote: IState = {
  ...initState,
  isSaving: true,
  savingMessage: "saving",
};

export const emptyNote: IState = {
  ...initState,
  active: {
    title: "",
    body: "",
    date: new Date().getTime(),
    imageURLs: [],
  },
};

export const notes: IState = {
  ...initState,
  notes: demoNotes,
};

export const activeNote: IState = {
  ...initState,
  active: demoNote,
};

export const newNote: IState = {
  ...initState,
  notes: [demoNote],
  active: demoNote,
  endTransactionMessage: {
    message: "Successful save",
    color: "success",
  },
  isSaving: false,
  savingMessage: "",
};

export const beforeUpdateNote: IState = {
  ...initState,
  notes: [demoNote],
  active: demoNote,
};

export const afterUpdateNote: IState = {
  ...initState,
  notes: [demoNoteUpdated],
  active: demoNoteUpdated,
  endTransactionMessage: {
    message: "Successful update",
    color: "success",
  },
};

export const beforeDeleteNote: IState = {
  ...initState,
  notes: [demoNote, demoNote2],
  active: demoNote,
};

export const afterDeleteNote: IState = {
  ...initState,
  notes: [demoNote2],
  active: null,
  endTransactionMessage: {
    message: "Successful delete",
    color: "success",
  },
};

export const error: IState = {
  ...initState,
  endTransactionMessage: {
    message: "error",
    color: "error",
  },
};
