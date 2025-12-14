import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCjlW91UELl6MuGJ18de7_4mavCphiEXXE",
    authDomain: "float-game-portal-v1.firebaseapp.com",
    projectId: "float-game-portal-v1",
    storageBucket: "float-game-portal-v1.firebasestorage.app",
    messagingSenderId: "281358682292",
    appId: "1:281358682292:web:7e9cd01dd0389317edefe1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
