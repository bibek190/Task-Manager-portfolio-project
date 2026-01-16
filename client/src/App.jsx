import React from "react";
import toast, { Toaster } from "react-hot-toast";
import TaskForm from "./components/TaskForm";
import TaskItems from "./components/TaskItems";

const App = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center pt-20">
      <h1 className="text-2xl">Task Manager</h1>
      <TaskForm />
      <TaskItems />
      <Toaster />
    </div>
  );
};

export default App;
