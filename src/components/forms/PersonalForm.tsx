"use client";

import { personalDetailsSchema } from "@/schema/personalDetailsSchema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import TextField from "../ui/TextField";
import { DEFAULT_AVATAR } from "@/constants";

interface PersonalForm {
  uid: string;
  email: string;
}

const PersonalForm = ({ uid, email }: PersonalForm) => {
  const router = useRouter();

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email,
      phone: "",
      imageUrl: "",
    },
    onSubmit: async (values) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/users/update-user/${uid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            imageUrl: values.imageUrl.length ? values.imageUrl : DEFAULT_AVATAR,
          }),
        }
      );

      if (response.ok) {
        router.push("/");
      }
    },
    validationSchema: personalDetailsSchema,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue("imageUrl", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderFormFields = () => {
    return (
      <div className="flex flex-col gap-9 w-full">
        <div className="flex items-center gap-12 w-full justify-center">
          <TextField
            handleBlur={handleBlur}
            handleChange={handleChange}
            id="firstName"
            label="First Name"
            isPassword={false}
            login={false}
            name="firstName"
            touched={touched.firstName ?? false}
            type="text"
            error={errors.firstName}
            value={values.firstName}
          />
          <TextField
            handleBlur={handleBlur}
            handleChange={handleChange}
            id="lastName"
            label="Last Name"
            isPassword={false}
            login={false}
            name="lastName"
            touched={touched.lastName ?? false}
            type="text"
            value={values.lastName}
          />
        </div>
        <div className="flex items-center gap-12 w-full justify-center">
          <TextField
            isReadOnly
            handleBlur={handleBlur}
            handleChange={handleChange}
            id="email"
            label="Email"
            isPassword={false}
            login={false}
            name="email"
            touched={touched.email ?? false}
            type="text"
            value={values.email}
          />
          <TextField
            handleBlur={handleBlur}
            handleChange={handleChange}
            id="phone"
            label="Phone Number"
            isPassword={false}
            login={false}
            name="phone"
            touched={touched.phone ?? false}
            type="text"
            value={values.phone}
            error={errors.phone}
          />
        </div>
      </div>
    );
  };

  const handleClick = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/get-user/${uid}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-11 w-full items-start"
    >
      <div className="relative ">
        <input
          type="file"
          className="cursor-pointer absolute top-1 w-full h-36 opacity-0 rounded-full"
          onChange={handleFileChange}
          id="imageUrl"
          name="imageUrl"
        />
        {values.imageUrl === "" ? (
          <img src="/svg/avatar.svg" alt="" />
        ) : (
          <img
            src={`${values.imageUrl}`}
            className="w-[150px] h-36 rounded-full object-cover object-center"
          />
        )}
      </div>
      {renderFormFields()}
      <Button
        disabled={false}
        label="Create an account"
        type="submit"
        className="bg-black text-white"
      />
    </form>
  );
};

export default PersonalForm;
