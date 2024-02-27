// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/ setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOyhsoYUWMoikhWueqaHEoagj0eakBPB0",

  authDomain: "stemtask-6b0cc.firebaseapp.com",

  databaseURL:
    "https://stemtask-6b0cc-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "stemtask-6b0cc",

  storageBucket: "stemtask-6b0cc.appspot.com",

  messagingSenderId: "50335168602",

  appId: "1:50335168602:web:695b62111db81e44e88063",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function writeUserData(user, id, subject, color, description, date) {
  const db = getDatabase(app);
  const reference = ref(db, `users/${user.uid}/task${id}`);
  set(reference, {
    taskSubject: subject,
    taskColor: color,
    taskDesc: description,
    taskDate: date,
  });
}

// learn how to database
