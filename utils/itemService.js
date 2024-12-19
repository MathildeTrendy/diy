// itemService.js
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

// Opret et nyt item
export const createItem = async (itemData) => {
  try {
    const docRef = await addDoc(collection(db, "items"), itemData);
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
    const q = query(collection(db, "items"), where("ownerId", "==", ownerId));
    const querySnapshot = await getDocs(q);
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

// Hent alle items (til f.eks. global search)
export const getAllItems = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "items"));
    const items = [];
    querySnapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() });
    });
    return items;
  } catch (error) {
    console.error("Error fetching all items: ", error);
    throw error;
  }
};

// Opdater et item
export const updateItem = async (itemId, updatedData) => {
  try {
    const itemDocRef = doc(db, "items", itemId);
    await updateDoc(itemDocRef, updatedData);
    console.log("Item updated:", itemId);
  } catch (error) {
    console.error("Error updating item: ", error);
    throw error;
  }
};

// Slet et item
export const deleteItem = async (itemId) => {
  try {
    await deleteDoc(doc(db, "items", itemId));
    console.log("Item deleted:", itemId);
  } catch (error) {
    console.error("Error deleting item: ", error);
    throw error;
  }
};
