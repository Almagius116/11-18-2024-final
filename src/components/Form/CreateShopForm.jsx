import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../api/axiosInstance";

function CreateShopForm({ onClose, onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/shops", data);
      if (response.status === 201) {
        onSuccess();
        onClose();
      }
    } catch (err) {
      console.error("Failed to create shop:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-bold mb-4">Create New Shop</h2>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Shop Name
        </label>
        <input
          id="name"
          {...register("name", {
            required: "Shop Name is required",
            validate: (value) =>
              value.includes("Toko") || "Toko harus punya kata Toko",
          })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="adminEmail"
          className="block text-sm font-medium text-gray-700"
        >
          Admin Email
        </label>
        <input
          id="adminEmail"
          type="email"
          {...register("adminEmail", {
            required: "Admin Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.adminEmail && (
          <p className="text-red-500 text-sm mt-1">
            {errors.adminEmail.message}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
        >
          Create
        </button>
      </div>
    </form>
  );
}

export default CreateShopForm;
