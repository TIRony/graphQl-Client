import { useState } from "react";
import { useSelector } from "react-redux";
import { SubmitHandler } from "react-hook-form";
import { RootState } from "@/redux/store";
import { useLoginForm } from "@/utils/form-validation/auth.form";
import { useAppDispatch } from "@/redux/hook";
import { login } from "@/services/auth.service";
import { LoginSchema } from "@/utils/validation/auth.validator";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm(async (values) => {
    try {
      await dispatch(login(values)).unwrap();
    } catch (err) {
      setFormError("Invalid credentials");
    }
  });
  const onSubmit: SubmitHandler<LoginSchema> = (values) => {
    dispatch(login(values))
      .unwrap()
      .catch(() => {
        setFormError("Invalid credentials");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {formError && <div>{formError}</div>}
      {error && <div>{error}</div>}
    </form>
  );
};

export default LoginForm;
