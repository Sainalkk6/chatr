"use client";

import { useAuth } from "@/providers/AuthContext";
import { loginSchema } from "@/schema/loginSchema";
import { signupSchema } from "@/schema/signup-schema";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, db } from "@/utils/firebaseConfig";
import Button from "../ui/Button"
import TextField from "../ui/TextField";
import { doc, setDoc } from "firebase/firestore";

const initialValues = {
  username: "",
  email: "",
  password: "",
};

interface FormInterface {
  title: string;
  isLogin: boolean;
  subtitle: string;
  subtitleLink: string;
  buttonLabel: string;
}

const FormContainer = ({ buttonLabel, isLogin, subtitle, title, subtitleLink }: FormInterface) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useAuth() ?? {};
  const [disabled, setDisabled] = useState(true);

  const handleSignUp = async (email: string, password: string, username: string) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: username,
      });
      return response;
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.message.includes("email-already-in-use")) setError("User already exists");
      } else {
        setError("Something went wrong please");
      }
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setError("");
      return response;
    } catch (err) {
      setError("Inavild Credentials");
      console.log(err);
    }
  };

  const { touched, handleBlur, errors, handleChange, handleSubmit, values } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const response = isLogin ? await handleSignIn(values.email, values.password) : await handleSignUp(values.email, values.password, values.username);
        if (response) isLogin ? router.push("/") : router.push("/profile");
      } catch (error) {
        console.log("something went wrong while submitting the data ", error);
      }
    },
    validationSchema: isLogin ? loginSchema : signupSchema,
  });

  const handleClick = async () => {
    try {
      if (signIn) {
        await signIn();
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const allFieldsFilled = isLogin ? values.email.length > 0 && values.password.length > 0 : values.email.length > 0 && values.password.length > 0 && values.username.length > 0;
    const noErrors = isLogin ? !errors.email && !errors.password : !errors.email && !errors.password && !errors.username;
    setDisabled(!(allFieldsFilled && noErrors));
  }, [values, errors]);

  const renderUnderlinedText = (label: string) => <span className="text-text-dark underline">{label}</span>;

  const renderFormHeader = () => {
    return (
      <div className="flex flex-col justify-center lg:items-center">
        <h1 className="text-default-text-color text-2xl md:text-3xl font-medium ">{title}</h1>
        <p className="text-default-text-color font-albert">
          {subtitle}{" "}
          <span className="underline text-text-dark hover:text-blue-700 cursor-pointer" onClick={() => router.push(isLogin ? "signup" : "login")}>
            {subtitleLink}
          </span>
        </p>
      </div>
    );
  };

  const renderFormFields = () => {
    return (
      <div className="flex flex-col gap-6">
        {!isLogin && <TextField handleBlur={handleBlur} isPassword={false} touched={touched.username ?? false} handleChange={handleChange} error={errors.username ?? ""} id="username" label="username" name="username" type="text" value={values.username} login={false} />}
        <TextField handleBlur={handleBlur} isPassword={false} touched={touched.email ?? false} handleChange={handleChange} error={errors.email ?? ""} id="email" label="Email" name="email" type="text" value={values.email} login={false} />
        <TextField
          handleBlur={handleBlur}
          isPassword={true}
          touched={touched.password ?? false}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
          handleChange={handleChange}
          error={errors.password ?? ""}
          id="password"
          label="Password"
          name="password"
          type={`${showPassword ? "text" : "password"}`}
          value={values.password}
          login={false}
        />
      </div>
    );
  };

  const renderTermsField = () => {
    return (
      <div className="flex w-full max-w-[340px] p-2 pl-0 mt-7">
        <p className="text-field-label md:text-base text-sm">
          By creating an account, you agree to our {renderUnderlinedText("Terms of use")} and {renderUnderlinedText("Privacy Policy")}
        </p>
      </div>
    );
  };

  return (
    <div className="flex w-full py-10 px-8 justify-center h-screen flex-col lg:items-center">
      <div className="flex flex-col gap-8 w-full">
        <div className="flex lg:items-center lg:justify-center">
          <img src="/svg/logo.svg" alt="" className="lg:w-[109px] lg:h-9 w-[89px] h-7 md:h-8 md:w-[102px]" />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {renderFormHeader()}
          {renderFormFields()}
          {error.length > 0 && <p className="text-red-500 mt-3 text-">{error}</p>}
          {renderTermsField()}
          <Button type="submit" disabled={disabled} className="bg-black text-white" label={buttonLabel} />
          <Button type="button" handleClick={handleClick} label="Sign in with Google" disabled className="bg-white text-black border border-[#bbb]" image="/svg/google.svg" />
        </form>
      </div>
    </div>
  );
};

export default FormContainer;

// import { updateDoc } from "firebase/firestore";

// await updateDoc(doc(db, "users", user.uid), {
//   phoneNumber: "+1234567890", // New field
//   hobbies: ["reading", "coding", "gaming"], // New field
// });
