export const getBaseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://planx-backend.onrender.com/api/v1";
  }
  return "http://localhost:5000/api/v1";
};
