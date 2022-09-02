import { useState } from "react";
import axios from "../utils/axios";

export default function TodoListItem({ id, tasks, setTasks, text, token }) {
  const [newTitle, setNewTitle] = useState("");

  const editTask = (id) => {
    document.getElementById("task-" + id).classList.add("hideme");
    document.getElementById("task-actions-" + id).classList.add("hideme");
    document.getElementById("input-button-" + id).classList.remove("hideme");
    document.getElementById("done-button-" + id).classList.remove("hideme");
  };

  const deleteTask = (token, id, tasks, setTasks) => {
    axios
      .delete(`todo/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setTasks(tasks.filter((task) => task.id != id));
      })
      .catch((error) => {
        console.log("Error in Deleting the task ! Try Again !");
      });
  };

  const updateTask = (token, id, tasks, setTasks) => {
    if (newTitle != "") {
      axios
        .put(
          `todo/${id}/`,
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
          setNewTitle("");
          const newTasksList = tasks.map((task) => {
            if (task.id == id) {
              return { ...task, title: newTitle };
            }
            return task;
          });
          setTasks(newTasksList);
        })
        .catch((error) => {
          console.log("Error in Editing the task ! Try Again !");
        });
    } else {
      console.log("Error ! Title cannot be empty !");
    }

    document.getElementById("task-" + id).classList.remove("hideme");
    document.getElementById("task-actions-" + id).classList.remove("hideme");
    document.getElementById("input-button-" + id).classList.add("hideme");
    document.getElementById("done-button-" + id).classList.add("hideme");
  };

  return (
    <>
      <li
        id={"task-list-item-" + id}
        className="border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2"
      >
        <input
          id={"input-button-" + id}
          type="text"
          className="hideme appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input"
          placeholder="Edit The Task"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <div id={"done-button-" + id} className="hideme">
          <button
            className="bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task"
            type="button"
            onClick={() => updateTask(token, id, tasks, setTasks)}
          >
            Done
          </button>
        </div>
        <div id={"task-" + id} className="todo-task  text-gray-600">
          {text}
        </div>
        <span id={"task-actions-" + id} className="">
          <button
            style={{ marginRight: "5px" }}
            type="button"
            onClick={() => editTask(id)}
            className="bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2"
          >
            <img
              src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png"
              width="18px"
              height="20px"
              alt="Edit"
            />
          </button>
          <button
            type="button"
            className="bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2"
            onClick={() => deleteTask(token, id, tasks, setTasks)}
          >
            <img
              src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"
              width="18px"
              height="22px"
              alt="Delete"
            />
          </button>
        </span>
      </li>
    </>
  );
}
