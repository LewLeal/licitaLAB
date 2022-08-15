import React from "react";
import { useSelector } from "react-redux";

const ThingsTotal = () => {
  const task = useSelector((state) =>
    state.task.filter((task) => task.completed === true)
  );

  return <h4 className="mt-3">Total complete items: {task.length}</h4>;
};

export default ThingsTotal;
