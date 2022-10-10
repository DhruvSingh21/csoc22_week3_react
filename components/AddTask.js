import axios from "../utils/axios";
import { useState } from "react";
export default function AddTask({ tasks, getTasks, token }) {
  const [newTitle, setNewTitle] = useState("");
  const addTask = (token, getTasks) => {
    if (newTitle != "") {
      axios
        .post(
          "todo/create/",
          {
            title: newTitle,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((res) => {
          getTasks();
        })
        .catch((error) => {
          console.log("Error in adding task ! Try Again !");
        });
    } else {
      console.log("Error ! Title cannot be empty !");
    }
  };
  return (
    <div className="flex items-center max-w-sm mt-24">
      <input
        type="text"
        className="todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
        placeholder="Enter Task"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button
        type="button"
        className="todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded"
        onClick={() => addTask(token, getTasks)}
      >
        Add Task
      </button>
    </div>
  );
}
