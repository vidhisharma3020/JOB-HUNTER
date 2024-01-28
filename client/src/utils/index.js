import axios from "axios";

const API_URL = "http://localhost:8000/api-v1";
// const API_URL = "https://jobfinder-fej3.onrender.com/api-v1";

export const API = axios.create({
  baseURL: API_URL,
  responseType: "json",
});

export const apiRequest = async ({ url, token, data, method }) => {
  try {
    const result = await API.request({
      url,
      method: method || "GET",
      data: data,
      headers: {
        "content-type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    console.log("got the data");
    return result?.data;
  } catch (error) {
    const err = error.response?.data;
    console.log("got some error in utils index", err);
    return { status: err?.success, message: err?.message };
  }
};

export const handleFileUpload = async (uploadFile) => {
  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", "job_finder");

  console.log(formData); // Log the formData to check if it's correct

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dai0zbna0/image/upload",
      formData
    );

    console.log(response.data.secure_url); // Log the secure URL
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Rethrow the error to propagate it to the caller
  }
};

export const updateURL = ({
  pageNum,
  query,
  cmpLoc,
  sort,
  navigate,
  location,
  jType,
  exp,
}) => {
  const params = new URLSearchParams();

  if (pageNum && pageNum > 1) {
    params.set("page", pageNum);
  }
  if (query) {
    params.set("search", query);
  }
  if (cmpLoc) {
    params.set("location", cmpLoc);
  }
  if (sort) {
    params.set("sort", sort);
  }
  if (jType) {
    params.set("jtype", jType);
  }
  if (exp) {
    params.set("exp", exp);
  }

  const newURL = `${location.pathname}?${params.toString()}`;
  navigate(newURL, { replace: true });

  return newURL;
};
