import axios from "axios";
import { CLOUDINARY } from "../constants";

export const uploadImage = async (e, setPhoto) => {
    axios.post(
      CLOUDINARY.URL,
      {
        upload_preset: CLOUDINARY.PRESET,
        file: e[0].base64
      }
    ).then((response) => {
        setPhoto(response.data.secure_url);
    });
}

export const uploadImages = async (e, photos, setPhotos) => {
  for (let i = 0; i < e.length; i++) {
    axios.post(
      CLOUDINARY.URL,
      {
        upload_preset: CLOUDINARY.PRESET,
        file: e[i].base64
      }
    ).then((response) => {
        setPhotos(photos => [...photos, response.data.secure_url])
    });
  }
}