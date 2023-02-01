import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { FC, useMemo } from "react";
import { INote } from "../models";

interface Props {
  note: INote;
  selectNote: (note: INote) => void;
}

export const NoteItem: FC<Props> = ({ note, selectNote }) => {
  //--> Methods

  const titleLength = useMemo(() => {
    return note.title.length > 22
      ? `${note.title.substring(0, 22)} ...`
      : note.title;
  }, [note.title]);

  const bodyLength = useMemo(() => {
    return note.body.length > 90
      ? `${note.body.substring(0, 90)} ...`
      : note.body;
  }, [note.body]);

  //--> Renders

  return (
    <ListItem key={note.id} disablePadding>
      <ListItemButton onClick={() => selectNote(note)}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container flexDirection="column">
          <ListItemText primary={titleLength} />
          <ListItemText secondary={bodyLength} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
