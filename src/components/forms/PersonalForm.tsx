"use client";
import { useAuth } from "@/providers/AuthContext";
import React from "react";
import TextField from "../ui/TextField";
import { useFormik } from "formik";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const PersonalForm = () => {
  const { user } = useAuth() ?? {};

  const { handleBlur, handleChange, values, errors, touched } = useFormik({
    initialValues,
    onSubmit: () => {},
  });

  const renderFormFields = () => {
    return (
      <div className="flex flex-col gap-9">
        <div className="flex items-center gap-12">
          <TextField handleBlur={handleBlur} handleChange={handleChange} id="firstName" label="First Name" isPassword={false} login={false} name="firstName" touched={touched.firstName ?? false} type="text" value={values.firstName} />
          <TextField handleBlur={handleBlur} handleChange={handleChange} id="lastName" label="Last Name" isPassword={false} login={false} name="lastName" touched={touched.lastName ?? false} type="text" value={values.lastName} />
        </div>
        <div className="flex items-center gap-12">
          <TextField handleBlur={handleBlur} handleChange={handleChange} id="email" label="Email" isPassword={false} login={false} name="firstName" touched={touched.firstName ?? false} type="text" value={values.firstName} />
          <TextField handleBlur={handleBlur} handleChange={handleChange} id="lastName" label="Last Name" isPassword={false} login={false} name="lastName" touched={touched.lastName ?? false} type="text" value={values.lastName} />
        </div>
      </div>
    );
  };

  const handleClick = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/get-user/${user?.uid}`);
    console.log(response);
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-11">
      {/* TODO: Prepare an input field for uploading the photo */}
      <div className=""></div>
      <button onClick={handleClick}>yeeeyyy</button>
    </div>
  );
};

export default PersonalForm;
