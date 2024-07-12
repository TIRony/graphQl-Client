import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  signupSchema,
  LoginSchema,
  SignupSchema,
} from "../validation/auth.validator";

export const useLoginForm = (onSubmit: (values: LoginSchema) => void) => {
  return useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
};

export const useSignupForm = (onSubmit: (values: SignupSchema) => void) => {
  return useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
};
