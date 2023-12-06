import { Verse } from "@/types/VerseType";
import { db } from "./config"; // Import your Firestore configuration
import {
  collection,
  addDoc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";

// Function to add a message to the 'messages' collection
export async function addMessage(messageData: Verse) {
  try {
    const docRef = await addDoc(collection(db, "messages"), messageData);
    console.log("Document written with ID: ", docRef.id);

    const messageId = docRef.id;

    await updateUser(messageData.userId, {
      verses: arrayUnion(messageId),
    });
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
export async function addUser(userData: any, docId: string) {
  try {
    const docRef = doc(db, "users", docId);
    await setDoc(docRef, userData);
    console.log("User added with ID: ", docId);
    return docId;
  } catch (e) {
    console.error("Error adding user: ", e);
    return;
  }
}

async function updateUser(userId: string, updates: any) {
  try {
    const userDocRef = doc(db, "users", userId); // Adjust "users" to your users collection name
    await updateDoc(userDocRef, updates);
    console.log("User updated with attributes: ", updates);
  } catch (e) {
    console.error("Error updating user: ", e);
  }
}

// Function to get user data
export async function getUserData(docId: string) {
  try {
    const docRef = doc(db, "users", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data(); // Return the user data
    } else {
      console.log("No user found with ID:", docId);
      return null; // Return null if no document is found
    }
  } catch (e) {
    console.error("Error getting user data: ", e);
    throw e; // It's better to throw the error to handle it in the caller function
  }
}
