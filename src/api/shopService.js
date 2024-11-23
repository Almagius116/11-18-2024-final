import axiosInstance from "./axiosInstance";

export const fetchShops = async ({ filters = {}, page = 1, size = 10 }) => {
  const filteredParams = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value.trim() !== "")
  );

  const params = {
    page,
    size,
    ...filteredParams,
  };

  try {
    const response = await axiosInstance.get("/shops", { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch shops.");
  }
};
