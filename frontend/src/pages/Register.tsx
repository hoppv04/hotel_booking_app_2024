import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const { mutate } = useMutation(apiClient.register, {
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Create an Account</h2>

      <div className="flex flex-col md:flex-row gap-5">
        <label
          htmlFor="firstName"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          First Name
          <input
            type="text"
            id="firstName"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", {
              required: "This field is required",
              validate: (value) =>
                value.trim() !== "" || "This field cannot be only spaces",
            })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>

        <label
          htmlFor="lastName"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          Last Name
          <input
            type="text"
            id="lastName"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", {
              required: "This field is required",
              validate: (value) =>
                value.trim() !== "" || "This field cannot be only spaces",
            })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>

      <label htmlFor="email" className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          id="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", {
            required: "This field is required",
          })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>

      <label
        htmlFor="password"
        className="text-gray-700 text-sm font-bold flex-1"
      >
        Password
        <input
          type="password"
          id="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>

      <label
        htmlFor="confirmPassword"
        className="text-gray-700 text-sm font-bold flex-1"
      >
        Confirm Password
        <input
          type="password"
          id="confirmPassword"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>

      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
