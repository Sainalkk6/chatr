import * as yup from "yup";

export const signupSchema = yup.object().shape({
  username: yup
    .string()
    .required("Required")
    .min(4, "Username should be atleast 4 characters"),
  email: yup.string().email("Enter a valid Email").required("Required"),
  password: yup.string().required("Required").min(8, "Password should be atleast 8 characters long").matches(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    "Password must contain at least one letter, one number, and one special character"
  )
});
