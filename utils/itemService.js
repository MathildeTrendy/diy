import { db } from "../firebase";
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where 
} from "firebase/firestore";

// Opret et nyt item i brugerens subcollection
export const createItem = async (itemData) => {
  try {
    const { ownerId } = itemData; // ownerId bruges til at identificere brugeren
    const userItemsRef = collection(db, "users", ownerId, "items");
    const docRef = await addDoc(userItemsRef, itemData);
    console.log("Item created with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating item: ", error);
    throw error;
  }
};

// Hent alle items for en given bruger
export const getUserItems = async (ownerId) => {
  try {
    const userItemsRef = collection(db, "users", ownerId, "items");
    const querySnapshot = await getDocs(userItemsRef);
    const items = [];
    querySnapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() });
    });
    return items;
  } catch (error) {
    console.error("Error fetching user items: ", error);
    throw error;
  }
};

// Opdater et item i brugerens subcollection
export const updateItem = async (ownerId, itemId, updatedData) => {
  try {
    const itemDocRef = doc(db, "users", ownerId, "items", itemId);
    await updateDoc(itemDocRef, updatedData);
    console.log("Item updated:", itemId);
  } catch (error) {
    console.error("Error updating item: ", error);
    throw error;
  }
};

// Slet et item i brugerens subcollection
export const deleteItem = async (ownerId, itemId) => {
  try {
    const itemDocRef = doc(db, "users", ownerId, "items", itemId);
    await deleteDoc(itemDocRef);
    console.log("Item deleted:", itemId);
  } catch (error) {
    console.error("Error deleting item: ", error);
    throw error;
  }
};
