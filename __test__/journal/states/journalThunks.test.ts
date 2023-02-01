import {
  deleteNote,
  deletingNote,
  loadingNotes,
  savingNewNote,
  savingNote,
  setError,
  setNotes,
  startSaving,
  updateNote,
} from "@/modules/journal/states";
import {
  activeNote,
  beforeUpdateNote,
  demoNewNote,
  demoNewNoteWithId,
  demoNote,
  demoNoteUpdated,
  emptyNote,
  initState,
} from "./journalFixtures";
// Fixtures
import { demoUser } from "__test__/auth/states/authFixtures";
// Helpers
import { onDeleting, onSaving, onUpdating } from "@/modules/journal/helpers";

jest.mock("@/modules/journal/helpers");

describe("Test journalThunks", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const mockedOnSaving = jest.mocked(onSaving);
  const mockedOnUpdating = jest.mocked(onUpdating);
  const mockedOnDeleting = jest.mocked(onDeleting);
  beforeEach(() => jest.clearAllMocks());

  test("should load notes by user", async () => {
    getState.mockReturnValue({
      auth: { user: demoUser },
      journal: initState,
    });
    await loadingNotes()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(setNotes([]));
  });

  test("should create a new note", async () => {
    getState.mockReturnValue({
      auth: { user: demoUser },
      journal: emptyNote,
    });
    mockedOnSaving.mockResolvedValue(demoNewNoteWithId);
    await savingNewNote(demoNewNote)(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(startSaving("Saving note..."));
    expect(dispatch).toHaveBeenCalledWith(
      savingNote({ ...demoNewNote, id: expect.any(String) })
    );
  });

  test("should throw an error on new note", async () => {
    getState.mockReturnValue({
      auth: { user: demoUser },
      journal: emptyNote,
    });
    mockedOnSaving.mockRejectedValue(new Error("error"));
    await savingNewNote(demoNewNote)(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(setError("error"));
  });

  test("should update a note", async () => {
    getState.mockReturnValue({
      auth: { user: demoUser },
      journal: beforeUpdateNote,
    });
    mockedOnUpdating.mockResolvedValue(demoNoteUpdated);
    await savingNewNote(demoNote)(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(updateNote(demoNoteUpdated));
  });

  test("should throw an error on update note", async () => {
    getState.mockReturnValue({
      auth: { user: demoUser },
      journal: beforeUpdateNote,
    });
    mockedOnUpdating.mockRejectedValue(new Error("error"));
    await savingNewNote(demoNote)(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(setError("error"));
  });

  test("should delete a note", async () => {
    getState.mockReturnValue({
      auth: { user: demoUser },
      journal: activeNote,
    });
    mockedOnDeleting.mockResolvedValue();
    await deletingNote()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(startSaving("Deleting note..."));
    expect(dispatch).toHaveBeenCalledWith(deleteNote(demoNote.id!));
  });

  test("should throw an error on delete a note", async () => {
    getState.mockReturnValue({
      auth: { user: demoUser },
      journal: activeNote,
    });
    mockedOnDeleting.mockRejectedValue(new Error("error"));
    await deletingNote()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(startSaving("Deleting note..."));
    expect(dispatch).toHaveBeenCalledWith(setError("error"));
  });
});
