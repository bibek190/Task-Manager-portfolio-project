import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksAPI, getTasksAPI } from "../features/tasks/taskSlice.js";
import toast from "react-hot-toast";
import { GridLoader } from "react-spinners";

const TaskForm = () => {
  const [data, setData] = useState({ title: "", description: "" });
  const dispatch = useDispatch();

  const { error, isLoading } = useSelector((state) => state.tasks);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchTasksAPI(data));
    setData({ title: "", description: "" });
  };

  useEffect(() => {
    dispatch(getTasksAPI());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <GridLoader color="#3b82f6" />
        </div>
      )}
      <div className="flex flex-col pt-10 w-full justify-center items-center gap-2">
        <input
          type="text"
          className="input w-lg"
          onChange={handleChange}
          value={data.title}
          name="title"
          placeholder="Please enter a title"
        />
        <textarea
          className="textarea w-lg"
          onChange={handleChange}
          value={data.description}
          name="description"
          placeholder="Description"
        />
        <button
          className="btn btn-primary px-10"
          type="submit"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default TaskForm;
