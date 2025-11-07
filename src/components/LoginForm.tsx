import { useForm } from "react-hook-form";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { login, setLoading, setError } from "../store/auth/authSlice";
import axios from "axios";
import { IUser } from "../models/IUser";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

type FormFields = {
  login: string;
  password: string;
};

export const LoginForm = () => {
  const error = useSelector((state: RootState) => state.auth.error);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();


  const onSubmit = useCallback(async (data: FormFields) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(""));

      const res = await axios.get<IUser[]>("/users.json");
      const users = await res.data;

      const foundUser = users.find(
        (user: IUser) =>
          user.username === data.login && user.password === data.password
      );

      if (foundUser) {
        const fakeToken = `jwt-token-${Date.now()}`
        dispatch(login({user: foundUser, token: fakeToken}));
        navigate("/event");
      } else {
        dispatch(setError("Invalid credentials"));
      }
    } catch (error) {
      dispatch(setError("Login failed"));
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, navigate]);


  return (
    <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="loginFormTitle">Sign In</h1>
      <div className="customInput">
        <label className="customInputLabel" htmlFor="login">
          login
        </label>
        <input
          className="customInputField"
          type="text"
          placeholder="Enter login..."
          required
          id="login"
          {...register("login", {
            required: "Login is required",
            minLength: {
              value: 3,
              message: "Login must be at least 3 characters",
            },
          })}
        />
        {errors.login && <p style={{ color: "red" }}>{errors.login.message}</p>}
      </div>
      <div className="customInput">
        <label className="customInputLabel" htmlFor="password">
          password
        </label>
        <input
          className="customInputField"
          type="password"
          placeholder="Enter password..."
          required
          id="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Password must be at least 3 characters",
            },
          })}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
      </div>
      {error && (
        <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>
      )}
      <button className="loginFormBtn" type="submit" disabled={isLoading}>
        {isLoading ? "loading..." : "submit"}
      </button>
    </form>
  );
};
