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