import axios from "axios";

export const uploadImage = async (e, setPhoto) => {
    axios.post(
      'https://api.cloudinary.com/v1_1/dtm8an029/image/upload',
      {
        upload_preset: "o1u6dtrg",
        file: e[0].base64
      }
    ).then((response) => {
        setPhoto(response.data.secure_url);
    });
}

export const uploadImages = async (e, photos, setPhotos) => {
  for (let i = 0; i < e.length; i++) {
    axios.post(
      'https://api.cloudinary.com/v1_1/dtm8an029/image/upload',
      {
        upload_preset: "o1u6dtrg",
        file: e[i].base64
      }
    ).then((response) => {
        setPhotos(photos => [...photos, response.data.secure_url])
    });
  }
}