import { useState } from "react";
import { useSelector } from "react-redux";
import { SubmitHandler } from "react-hook-form";
import { RootState } from "@/redux/store";
import { useSignupForm } from "@/utils/form-validation/auth.form";
import { signup } from "@/services/auth.service";
import { useAppDispatch } from "@/redux/hook";
import { SignupSchema } from "@/utils/validation/auth.validator";

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSignupForm(async (values) => {
    try {
      await dispatch(signup(values)).unwrap();
    } catch (err) {
      setFormError("Signup failed");
    }
  });

  const onSubmit: SubmitHandler<SignupSchema> = (values) => {
    dispatch(signup(values))
      .unwrap()
      .catch(() => {
        setFormError("Invalid credentials");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register("name")} type="name" />
        {errors.name && <div>{errors.name.message}</div>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register("email")} type="email" />
        {errors.email && <div>{errors.email.message}</div>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" {...register("password")} type="password" />
        {errors.password && <div>{errors.password.message}</div>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          {...register("confirmPassword")}
          type="password"
        />
        {errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Signup"}
      </button>
      {formError && <div>{formError}</div>}
      {error && <div>{error}</div>}
    </form>
  );
};

export default SignupForm;
