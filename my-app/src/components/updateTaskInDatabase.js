// Import necessary dependencies
import { getDatabase, ref, update } from "firebase/database";
import { app } from "../firebase/config";
// Define the function to update a task in the database
export async function updateTaskInDatabase(task) {
  try {
    const database = getDatabase(app);
    const taskRef = ref(database, `tasks/${task.id}`);
    await update(taskRef, task);
    console.log("Task updated in the database successfully.");
  } catch (error) {
    console.error("Error updating task in the database:", error.message);
    throw error; // Re-throw the error to handle it in the calling context if needed
  }
}
