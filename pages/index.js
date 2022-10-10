import TodoListItem from "../components/TodoListItem";
import AddTask from "../components/AddTask";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import checkLogin from "../middlewares/auth_required";
export default function Home() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);

  function getTasks() {
    if (token) {
      axios
        .get("todo/", {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.log("Some error occurred ! !");
        });
    }
  }
  useEffect(() => {
    checkLogin(token);
    getTasks();
  }, []);

  return (
    <div>
      <center>
        <AddTask getTasks={getTasks} token={token} />
        <ul className="flex-col mt-9 max-w-sm mb-3 ">
          <span className="inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full ">
            Available Tasks
          </span>
          {tasks.map((task) => (
            <TodoListItem
              key={task.id}
              id={task.id}
              text={task.title}
              tasks={tasks}
              setTasks={setTasks}
              token={token}
            />
          ))}
        </ul>
      </center>
    </div>
  );
}
