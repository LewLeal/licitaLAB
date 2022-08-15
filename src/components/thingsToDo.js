import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getTaskAsync } from "../redux/taskSlice";

const ThingsToDo = () => {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks);
  useEffect(() => {
    dispatch(getTaskAsync());
  }, [dispatch]);

  return (
    <div>
      <h1>Things to do</h1>
      <ul>
        {task.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ThingsToDo;
