import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    // Placeholder - Update with actual config from console after creation
    apiKey: "API_KEY",
    authDomain: "float-portal-2025.firebaseapp.com",
    projectId: "float-portal-2025",
    storageBucket: "float-portal-2025.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
