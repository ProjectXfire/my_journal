import * as Yup from "yup";

export const RegisterSchema = Yup.object({
  displayName: Yup.string().required("Field is required"),
  email: Yup.string()
    .email("Must be a valid email")
    .required("Field is required"),
  password: Yup.string()
    .min(8, "Must have at least 8 characters")
    .required("Field is required"),
});
