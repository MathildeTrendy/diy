import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";


export const createItem = async (itemData) => {
  try {
    const itemsRef = collection(db, "items");
    const docRef = await addDoc(itemsRef, itemData);
    console.log("Item created with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};


export const getAllItems = async () => {
  try {
    const itemsRef = collection(db, "items");
    const querySnapshot = await getDocs(itemsRef);
    const items = [];
    querySnapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() });
    });
    return items;
  } catch (error) {
    console.error("Error fetching all items:", error);
    throw error;
  }
};

// Henter kun items ejet af én bruger (hvis du fortsat vil filtrere på ejer)
export const getUserItems = async (ownerId) => {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("ownerId", "==", ownerId));
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() });
    });
    return items;
  } catch (error) {
    console.error("Error fetching user items:", error);
    throw error;
  }
};

export const updateItem = async (itemId, updatedData) => {
  try {
    const itemDocRef = doc(db, "items", itemId);
    await updateDoc(itemDocRef, updatedData);
    console.log("Item updated:", itemId);
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

export const deleteItem = async (itemId) => {
  try {
    const itemDocRef = doc(db, "items", itemId);
    await deleteDoc(itemDocRef);
    console.log("Item deleted:", itemId);
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
