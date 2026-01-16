import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTaskAPI, updateTasksAPI } from "../features/tasks/taskSlice";

const TaskItems = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const [editingTask, setEditingTask] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });

  const startEdit = (task) => {
    setEditingTask(task._id);
    setEditData({ title: task.title, description: task.description });
  };
  const saveEdit = () => {
    dispatch(updateTasksAPI({ id: editingTask, ...editData }));
    setEditingTask(null);
  };
  const cancelEdit = () => {
    setEditingTask(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteTaskAPI({ id }));
  };

  return (
    <div className="flex flex-col space-y-2 p-10 w-full">
      <ul className="flex flex-wrap gap-5 justify-center">
        {tasks.map((task) => (
          <li key={task._id}>
            <div className="card card-dash w-sm border-cyan-50">
              <div className="card-body">
                {editingTask === task._id ? (
                  <>
                    <input
                      type="text"
                      className="input w-full mb-2"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                    <textarea
                      className="textarea w-full mb-2"
                      value={editData.description}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                    <div className="flex gap-2">
                      <button className="btn btn-success" onClick={saveEdit}>
                        Save
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="card-title">{task.title}</h2>
                    <p>{task.description}</p>
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-primary mr-2"
                        onClick={() => startEdit(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-error"
                        onClick={() => handleDelete(task._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskItems;
