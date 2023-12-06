import { db } from "./config"; // Import your Firestore configuration
import {
  collection,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Function to add a message to the 'messages' collection
export async function addMessage(messageData: any) {
  try {
    const docRef = await addDoc(collection(db, "messages"), messageData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Function to read a message from the 'messages' collection
export async function getMessage(docId: string) {
  try {
    const docRef = doc(db, "messages", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.error("Error getting document: ", e);
  }
}

// Function to update a message in the 'messages' collection
export async function updateMessage(docId: string, updatedData: any) {
  try {
    const docRef = doc(db, "messages", docId);
    await updateDoc(docRef, updatedData);
    console.log("Document updated");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

// Function to delete a message from the 'messages' collection
export async function deleteMessage(docId: string) {
  try {
    await deleteDoc(doc(db, "messages", docId));
    console.log("Document deleted");
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}

// Function to add a user to the 'users' collection
export async function addUser(userData: any) {
  try {
    const docRef = await addDoc(collection(db, "users"), userData);
    console.log("User added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding user: ", e);
  }
}
