import React, { useRef } from "react";
// External libraries
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import {
  DeleteOutline,
  ImageOutlined,
  SaveOutlined,
} from "@mui/icons-material";
// Models
import { INote } from "../models";
// Schemas
import { NoteSchema } from "../schemas";
// Custom hooks
import { useJournal } from "../hooks";
import { NoteImages } from "./NoteImages";
// Utils
import { formattingDate } from "@/modules/shared/helpers";
import { NotePreviewImages } from "./NotePreviewImages";

export const Note = () => {
  //--> Hooks

  const {
    inputFilesRef,
    active,
    previewImages,
    onGetFilesToSave,
    savingNote,
    showDeleteDialog,
    removingImages,
  } = useJournal();

  //--> Renders

  if (!active) return <></>;

  return (
    <Grid container sx={{ p: 2 }}>
      <Grid xs={12} item>
        <Formik
          initialValues={{
            title: active.title,
            body: active.body,
          }}
          enableReinitialize
          validationSchema={NoteSchema}
          onSubmit={({ title, body }) => {
            savingNote(title, body.trim());
          }}
        >
          {({ handleSubmit, getFieldProps, errors, touched }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={1} gap={2}>
                  <Grid item>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography fontSize={30}>
                        {formattingDate(active.date)}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          type="button"
                          variant="contained"
                          color="error"
                          startIcon={<DeleteOutline />}
                          disabled={!active!.id}
                          onClick={showDeleteDialog}
                        >
                          Delete
                        </Button>
                        <input
                          style={{ display: "none" }}
                          type="file"
                          multiple
                          ref={inputFilesRef}
                          onChange={onGetFilesToSave}
                        />
                        <Button
                          variant="contained"
                          startIcon={<ImageOutlined />}
                          disabled={!active!.id}
                          onClick={() => inputFilesRef.current?.click()}
                        >
                          To upload
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          color="info"
                          startIcon={<SaveOutlined />}
                        >
                          Save
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Title"
                      type="title"
                      {...getFieldProps("title")}
                      placeholder="Title"
                      fullWidth
                      error={!!errors.title && touched.title}
                      helperText={touched.title && errors.title}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Note"
                      type="text"
                      {...getFieldProps("body")}
                      variant="outlined"
                      multiline
                      minRows={10}
                      fullWidth
                      placeholder="What happened today?"
                      error={!!errors.body && touched.body}
                      helperText={touched.body && errors.body}
                    />
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Grid>
      {previewImages.length > 0 && <NotePreviewImages images={previewImages} />}
      {active!.imageURLs.length > 0 && (
        <NoteImages
          images={active!.imageURLs}
          removingImages={removingImages}
        />
      )}
    </Grid>
  );
};
