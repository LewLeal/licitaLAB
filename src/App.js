import React from "react";
import "./App.css";
import AddTaskForm from "./components/addTaskForm";
import ThingsToDo from "./components/thingsToDo";
import ThingsTotal from "./components/thingsTotal";

function App() {
  return (
    <div className="container bg-white p-4 mt-5">
      <h1>Lista de Tareas </h1>
      <AddTaskForm />
      <ThingsToDo />
      <ThingsTotal />
    </div>
  );
}

export default App;
