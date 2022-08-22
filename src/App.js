import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTask } from "./taskState";

function App() {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.task.tasks);

  useEffect(() => {
    dispatch(getTask());
  }, [dispatch]);
  console.log(task);
  return (
    <div className="App">
      <h1>Cosas por hacer</h1>
      <p> Lista de tareas por hacer </p>
      <hr />
      <div className="task-list">
        {task.map((task) => (
          <img
            key={task.id}
            alt={task.author}
            src={task.download_url}
            width="400"
            height="400"
          />
        ))}
      </div>
      <button>Ver más</button>
    </div>
  );
}

export default App;
