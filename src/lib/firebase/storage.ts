import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

// Assuming you've initialized Firebase elsewhere and exported it as `firebaseApp`

// Function to upload a file to Firebase Storage
export async function uploadFile(file: File, userId: string) {
  try {
    // Create a storage reference
    const storageRef = ref(storage, `uploads/${userId}/${file.name}`);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);

    // Get the URL of the uploaded file
    const url = await getDownloadURL(snapshot.ref);
    console.log("File available at", url);

    return url;
  } catch (e) {
    console.error("Error uploading file: ", e);
    throw e;
  }
}
