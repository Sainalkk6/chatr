import * as yup from "yup"

export const personalDetailsSchema = yup.object().shape({
    firstName:yup.string().required("Required").min(4,"First name should be atleast 4 characters"),
    phone:yup.number().optional().typeError("It says Phone number, cant you read")
})
