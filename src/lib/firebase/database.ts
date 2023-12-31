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
  query,
  orderBy,
  limit,
  getDocs,
  increment,
  arrayRemove,
  where,
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
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.error("Error getting document: ", e);
  }
}

export async function getTopThreeLikedMessages() {
  try {
    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("likes", "desc"),
      orderBy("postedDate", "desc"),
      limit(3)
    );
    const querySnapshot = await getDocs(messagesQuery);

    const messages: any[] = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });

    return messages; // Returns an array of the top three messages
  } catch (e) {
    console.error("Error getting top three messages: ", e);
  }
}

export async function getTrendyMessages() {
  try {
    const messagesQuery = query(
      collection(db, "messages"),
      where("trendy", "==", true),
      orderBy("postedDate", "desc")
    );
    const querySnapshot = await getDocs(messagesQuery);

    const messages: any = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });

    return messages; // Returns an array of messages with trendy set to true
  } catch (e) {
    console.error("Error getting trendy messages: ", e);
  }
}

export async function getAllMessages() {
  try {
    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("postedDate", "desc")
    );
    const querySnapshot = await getDocs(messagesQuery);

    const allMessages: any[] = [];
    querySnapshot.forEach((doc) => {
      allMessages.push({ id: doc.id, ...doc.data() });
    });

    return allMessages; // Returns an array of all messages
  } catch (e) {
    console.error("Error getting all messages: ", e);
  }
}

export async function getMessagesByUserId(userId: string) {
  try {
    const messagesQuery = query(
      collection(db, "messages"),
      where("userId", "==", userId), // Filter by userId
      orderBy("postedDate", "desc") // You can still order the results by date
    );
    const querySnapshot = await getDocs(messagesQuery);

    const userMessages: any[] = [];
    querySnapshot.forEach((doc) => {
      userMessages.push({ id: doc.id, ...doc.data() });
    });

    return userMessages; // Returns an array of messages for the specified user
  } catch (e) {
    console.error("Error getting messages for user: ", e);
  }
}

// Function to update a message in the 'messages' collection
export async function updateMessage(docId: string, updates: any) {
  try {
    const userDocRef = doc(db, "messages", docId); // Adjust "users" to your users collection name
    await updateDoc(userDocRef, updates);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}

// Function to delete a message from the 'messages' collection
export async function deleteUserVerse(userId: string, verseId: string) {
  try {
    const userDocRef = doc(db, "users", userId); // Adjust "users" to your users collection name
    const verseToRemove = { id: verseId }; // Assuming each verse is an object with an 'id' property
    await updateDoc(userDocRef, {
      verses: arrayRemove(verseToRemove),
    });
    console.log(`Verse with ID ${verseId} removed from user ${userId}`);
  } catch (e) {
    console.error("Error removing verse from user: ", e);
  }
}

export async function searchMessagesByWord(searchWord: string) {
  try {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, where("content", "==", searchWord));

    const querySnapshot = await getDocs(q);
    const matchedMessages: any = [];

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        matchedMessages.push({ id: doc.id, ...doc.data() });
      });
      return matchedMessages;
    } else {
      console.log("No messages found containing the word:", searchWord);
      return [];
    }
  } catch (e) {
    console.error("Error searching messages: ", e);
    throw e;
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

export async function updateUser(userId: string, updates: any) {
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

// Function to get specific user data
export async function getSpecificUserData(docId: string) {
  try {
    const docRef = doc(db, "users", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      // Extract only the required fields
      return {
        id: docId,
        username: userData.username,
        profilePicUrl: userData.profilePicUrl,
        followers: userData.followers,
        following: userData.following,
        trendy: userData.trendy,
        warnings: userData.warnings,
      };
    } else {
      console.log("No user found with ID:", docId);
      return null; // Return null if no document is found
    }
  } catch (e) {
    console.error("Error getting specific user data: ", e);
    throw e; // It's better to throw the error to handle it in the caller function
  }
}

export async function updateLikesAndDislikes(
  verseId: string,
  userId: string,
  username: string,
  action: "like" | "dislike"
) {
  try {
    const messageDocRef = doc(db, "messages", verseId);
    const docSnapshot = await getDoc(messageDocRef);

    if (docSnapshot.exists()) {
      const messageData = docSnapshot.data();
      const usersLiked = messageData.usersLiked || [];
      const usersDisliked = messageData.usersDisliked || [];
      const updateData: any = {};

      // Handling like action
      if (action === "like") {
        if (usersDisliked.includes(username)) {
          updateData["usersDisliked"] = arrayRemove(username);
          updateData["dislikes"] = increment(-1);
          // Update user's dislikes
          await updateUser(userId, { dislikes: increment(-1) });
        }
        updateData["usersLiked"] = arrayUnion(username);
        updateData["likes"] = increment(1);
        // Update user's likes
        await updateUser(userId, { likes: increment(1) });
      }

      // Handling dislike action
      if (action === "dislike") {
        if (usersLiked.includes(username)) {
          updateData["usersLiked"] = arrayRemove(username);
          updateData["likes"] = increment(-1);
          // Update user's likes
          await updateUser(userId, { likes: increment(-1) });
        }
        updateData["usersDisliked"] = arrayUnion(username);
        updateData["dislikes"] = increment(1);
        // Update user's dislikes
        await updateUser(userId, { dislikes: increment(1) });
      }

      await updateDoc(messageDocRef, updateData);
      console.log("Message updated successfully");
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.error("Error updating message: ", e);
  }
}

export async function getTrendyUsers() {
  try {
    const usersQuery = query(
      collection(db, "users"),
      where("trendy", "==", true),
      limit(3)
    );
    const querySnapshot = await getDocs(usersQuery);

    const users: any = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    return users; // Returns an array of users with trendy set to true
  } catch (e) {
    console.error("Error getting trendy users: ", e);
  }
}
