// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";

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

// Initialize Realtime Database and get a reference to the service
// function writeUserData(userId, name, email, imageUrl) {
//   const db = getDatabase(app);
//   set(ref(db, "users/" + userId), {
//     username: name,
//     email: email,
//     profile_picture: imageUrl,
//   })
//     .then(() => {
//       console.log("Data written successfully!");
//     })
//     .catch((error) => {
//       console.error("Error writing data:", error);
//     });
// }

// writeUserData("fehre", "wion", "wion@mail.com", "myimage");

// export function writeUserData(user, id, subject, color, description, date) {
//   const db = getDatabase(app);
//   const reference = ref(db, "users/" + user.uid);
//   set(reference, {
//     taskId: id,
//     taskSubject: subject,
//     taskColor: color,
//     taskDesc: description,
//     taskDate: date,
//   });
// }

export function writeUserData(user, id, subject, color, description, date) {
  const db = getDatabase();
  const userTasksRef = ref(db, `users/${user.uid}/tasks`);

  // Use push to generate a unique task ID
  const newTaskRef = push(userTasksRef);

  // Get the unique task ID generated by push
  const taskId = newTaskRef.key;

  // Set the task data
  set(newTaskRef, {
    taskId: taskId,
    subject: subject,
    color: color,
    description: description,
    date: date,
  });
}

// learn how to database
