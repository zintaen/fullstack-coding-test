import { getFirestore, collection, getDocs } from "firebase/firestore";

import { firebaseApp } from "./client";

// firestore
export const db = getFirestore(firebaseApp);

export const queryDocs = async (collectionName: string) => {
  const response = await getDocs(collection(db, collectionName));
  return response.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
