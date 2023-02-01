// States
import {
  JournalSlice,
  addNewEmptyNote,
  clearEndTransactionMessage,
  clearState,
  deleteNote,
  savingNote,
  setActiveNote,
  setError,
  setNotes,
  showEndTransactionMessage,
  startSaving,
  toggleDeleteDialog,
  toggleSidebar,
  updateNote,
} from "@/modules/journal/states";
// Fixtures
import {
  activeNote,
  afterDeleteNote,
  afterUpdateNote,
  beforeDeleteNote,
  beforeUpdateNote,
  demoNote,
  demoNoteUpdated,
  demoNotes,
  emptyNote,
  error,
  initState,
  newNote,
  notes,
  processingSavingNote,
  txnMessage,
} from "./journalFixtures";

describe("Test in journalSlice", () => {
  test("should return init state and correct slice name", () => {
    const state = JournalSlice.reducer(initState, {} as any);
    expect(JournalSlice.name).toBe("journal");
    expect(state).toEqual(initState);
  });

  //--> UI states

  test("should return false or true on sidebar", () => {
    const sidebarTrue = JournalSlice.reducer(initState, toggleSidebar());
    initState.sidebar = true;
    expect(sidebarTrue).toEqual(initState);
    const sidebarFalse = JournalSlice.reducer(initState, toggleSidebar());
    initState.sidebar = false;
    expect(sidebarFalse).toEqual(initState);
  });
  test("should return false or true on show delete dialog", () => {
    const dialogTrue = JournalSlice.reducer(initState, toggleDeleteDialog());
    initState.openDeleteDialog = true;
    expect(dialogTrue).toEqual(initState);
    const dialogFalse = JournalSlice.reducer(initState, toggleDeleteDialog());
    initState.openDeleteDialog = false;
    expect(dialogFalse).toEqual(initState);
  });
  test("should return the transation message and the color selected", () => {
    const txn = JournalSlice.reducer(
      initState,
      showEndTransactionMessage({ color: "success", message: "message" })
    );
    expect(txn).toEqual(txnMessage);
  });
  test("should return the transaction message in null", () => {
    initState.endTransactionMessage = { color: "success", message: "message" };
    const txn = JournalSlice.reducer(initState, clearEndTransactionMessage());
    initState.endTransactionMessage = null;
    expect(txn).toEqual(initState);
  });
  test("should return the saving in true and the message", () => {
    const saving = JournalSlice.reducer(initState, startSaving("saving"));
    expect(saving).toEqual(processingSavingNote);
  });

  //--> Note state

  test("should return a empty note", () => {
    const emptyNoteState = JournalSlice.reducer(initState, addNewEmptyNote());
    emptyNote.active!.date = emptyNoteState.active!.date;
    expect(emptyNoteState).toEqual(emptyNote);
  });
  test("should return a empty array note", () => {
    const notesState = JournalSlice.reducer(initState, setNotes([]));
    expect(notesState).toEqual(initState);
  });
  test("should return a array of notes", () => {
    const notesState = JournalSlice.reducer(initState, setNotes(demoNotes));
    expect(notesState).toEqual(notes);
    expect(notesState.notes.length).toBe(2);
  });
  test("should return an active note", () => {
    const activeNoteState = JournalSlice.reducer(
      initState,
      setActiveNote(demoNote)
    );
    expect(activeNoteState).toEqual(activeNote);
  });
  test("should return a new note", () => {
    const newNoteState = JournalSlice.reducer(initState, savingNote(demoNote));
    expect(newNoteState).toEqual(newNote);
  });
  test("should return the updated note", () => {
    const updatedNoteState = JournalSlice.reducer(
      beforeUpdateNote,
      updateNote(demoNoteUpdated)
    );
    expect(updatedNoteState).toEqual(afterUpdateNote);
  });
  test("should remove one note according to the id", () => {
    const deleteNoteState = JournalSlice.reducer(
      beforeDeleteNote,
      deleteNote("123")
    );
    expect(deleteNoteState).toEqual(afterDeleteNote);
  });

  //--> Error and clean state
  test("should return error", () => {
    const errorState = JournalSlice.reducer(initState, setError("error"));
    expect(errorState).toEqual(error);
  });
  test("should return clean state", () => {
    const state = JournalSlice.reducer(newNote, clearState());
    expect(state).toEqual(initState);
  });
});
