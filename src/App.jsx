import { useState, useEffect } from "react";
import Taskform from "./components/Taskform";
import Tasklist from "./components/Tasklist";
import Progresstracker from "./components/Progresstracker";
import "./Style.css";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask, index) => {
    const newTask = [...tasks];
    newTask[index] = updatedTask;
    setTasks(newTask);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <div className="App">
      <header>
        <h1 className="title">TaskBuddy</h1>
        <p className="tagline">Your friendly Task Manager</p>
      </header>
      <Taskform addTask={addTask} />
      <Tasklist
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
      <Progresstracker tasks={tasks} />

      {tasks.length > 0 && (
        <button onClick={clearTasks} className="clear-btn">
          Clear all tasks
        </button>
      )}
    </div>
  );
}