import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

/**
 * Opretter et nyt item i Firestore.
 */
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

/**
 * Henter alle items (bruges kun hvis du vil vise ALT, uanset ejer).
 */
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

/**
 * Henter kun items, der tilhører en bestemt ejer (hvis du stadig vil lave "fetch én gang").
 */
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

/**
 * Opdaterer et eksisterende item med ny data.
 */
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

/**
 * Sletter et item fra Firestore.
 */
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

/**
 * **NY**: Real-time subscription til items for en bestemt user:
 * Når der sker ændringer (opret, update, slet), kalder den `callback(items)`
 * med den nyeste liste. Returnerer en "unsubscribe" metode.
 */
export const subscribeToUserItems = (ownerId, callback) => {
  const itemsRef = collection(db, "items");
  const q = query(itemsRef, where("ownerId", "==", ownerId));

  // Opret "onSnapshot" lytter til Firestore:
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    // Kalder callback med den aktuelle items-liste:
    callback(items);
  });

  // Returnér unsubscribe, så vi kan stoppe lytteren, hvis nødvendigt.
  return unsubscribe;
};
