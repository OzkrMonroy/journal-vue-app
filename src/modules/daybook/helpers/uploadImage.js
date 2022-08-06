import axios from "axios";

const uploadImage = async (file) => {
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("upload_preset", "react-journal");
    formData.append("file", file);

    const url = "https://api.cloudinary.com/v1_1/dxae8onmb/image/upload";
    const { data } = await axios.post(url, formData);

    console.log(data);
    return data.secure_url;
  } catch (error) {
    console.log("An error occurred while uploading the file", { error });
    return null;
  }
};

export default uploadImage;
