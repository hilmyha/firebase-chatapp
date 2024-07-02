// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfaq4PyXtc4cUoqiRsjPU-YahA6suUadA",
  authDomain: "fir-chat-4b146.firebaseapp.com",
  projectId: "fir-chat-4b146",
  storageBucket: "fir-chat-4b146.appspot.com",
  messagingSenderId: "268040364068",
  appId: "1:268040364068:web:5ac8b70b8c7c068375f8b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const usersRef = collection(db, "users");
export const roomsRef = collection(db, "rooms");