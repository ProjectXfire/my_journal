// External libraries
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material";
// Models
import { INote, ITransactionMessage } from "../models";

export interface IState {
  sidebar: boolean;
  isSaving: boolean;
  savingMessage: string;
  endTransactionMessage: ITransactionMessage | null;
  openDeleteDialog: boolean;
  notes: INote[];
  active: INote | null;
}

const initialState: IState = {
  sidebar: false,
  isSaving: false,
  openDeleteDialog: false,
  savingMessage: "",
  endTransactionMessage: null,
  notes: [],
  active: null,
};

export const JournalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    toggleSidebar: (state: IState) => {
      state.sidebar = !state.sidebar;
    },
    toggleDeleteDialog: (state: IState) => {
      state.openDeleteDialog = !state.openDeleteDialog;
    },
    showEndTransactionMessage: (
      state: IState,
      action: PayloadAction<{ color: AlertColor; message: string }>
    ) => {
      state.endTransactionMessage = {
        message: action.payload.message,
        color: action.payload.color,
      };
    },
    clearEndTransactionMessage: (state: IState) => {
      state.endTransactionMessage = null;
    },
    startSaving: (state: IState, action: PayloadAction<string>) => {
      state.isSaving = true;
      state.savingMessage = action.payload;
    },
    addNewEmptyNote: (state: IState) => {
      state.active = {
        title: "",
        body: "",
        date: new Date().getTime(),
        imageURLs: [],
      };
    },
    setNotes: (state: IState, action: PayloadAction<INote[]>) => {
      state.notes = action.payload;
    },
    setActiveNote: (state: IState, action: PayloadAction<INote>) => {
      state.active = action.payload;
    },
    savingNote: (state: IState, action: PayloadAction<INote>) => {
      state.endTransactionMessage = {
        message: "Successful save",
        color: "success",
      };
      state.isSaving = false;
      state.notes = [action.payload, ...state.notes];
      state.active = action.payload;
      state.savingMessage = "";
    },
    updateNote: (state: IState, action: PayloadAction<INote>) => {
      state.endTransactionMessage = {
        message: "Successful update",
        color: "success",
      };
      state.isSaving = false;
      state.active = action.payload;
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id ? { ...note, ...action.payload } : note
      );
    },
    updateImages: (state: IState, action: PayloadAction<INote>) => {
      state.endTransactionMessage = {
        message: "Successful images update",
        color: "success",
      };
      state.isSaving = false;
      state.active = action.payload;
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id ? { ...note, ...action.payload } : note
      );
    },
    deleteNote: (state: IState, action: PayloadAction<string>) => {
      state.endTransactionMessage = {
        message: "Successful delete",
        color: "success",
      };
      state.isSaving = false;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.active = null;
    },
    setError: (state: IState, action: PayloadAction<string>) => {
      state.endTransactionMessage = {
        message: action.payload,
        color: "error",
      };
      state.isSaving = false;
      state.savingMessage = "";
    },
    clearState: (state: IState) => {
      state.endTransactionMessage = null;
      state.savingMessage = "";
      state.notes = [];
      state.active = null;
    },
  },
});

export const {
  toggleSidebar,
  startSaving,
  savingNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  updateNote,
  deleteNote,
  updateImages,
  toggleDeleteDialog,
  setError,
  showEndTransactionMessage,
  clearEndTransactionMessage,
  clearState,
} = JournalSlice.actions;
