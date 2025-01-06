import { useEffect } from "react";
import { doc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";


export const usePresence = (userId:string) => {
  useEffect(() => {
    if (!userId) return;

    const userDocRef = doc(db, "users", userId);


    const goOnline = async () => {
      await setDoc(userDocRef, {
        state: "online",
        lastChanged: serverTimestamp(),
      }, { merge: true });
    };

    const goOffline = async () => {
      await updateDoc(userDocRef, {
        state: "offline",
        lastChanged: serverTimestamp(),
      });
    };

    goOnline();

    window.addEventListener("beforeunload", goOffline);

    return () => {
      goOffline();
      window.removeEventListener("beforeunload", goOffline);
    };
  }, [userId]);
};
