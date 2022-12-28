import { v4 } from "uuid";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

async function uploadImage (postImage) {
  if (postImage == null) return;
  const imageRef = ref(storage, `images/${postImage.name + v4()}`);

  await uploadBytes(imageRef, postImage);
  return await getDownloadURL(imageRef);
};

export default uploadImage;
