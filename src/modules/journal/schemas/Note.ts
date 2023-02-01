import * as Yup from "yup";

export const NoteSchema = Yup.object({
  title: Yup.string().required("Please add a title"),
  body: Yup.string().required("Please add a note"),
});
