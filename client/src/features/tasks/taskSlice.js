import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../utils/axios";

export const getTasksAPI = createAsyncThunk(
  "tasks/get",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/tasks");
      return res.data.tasks;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchTasksAPI = createAsyncThunk(
  "tasks/fetch",
  async ({ title, description }, thunkAPI) => {
    try {
      const res = await API.post("/tasks", { title, description });
      return res.data.task;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
export const updateTasksAPI = createAsyncThunk(
  "tasks/update",
  async ({ id, title, description }, thunkAPI) => {
    try {
      const res = await API.put(`/tasks/${id}`, { title, description });
      return res.data.updated;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteTaskAPI = createAsyncThunk(
  "tasks/delete",
  async ({ id }, thunkAPI) => {
    try {
      const res = await API.delete(`/tasks/${id}`);
      return res.data.task._id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasksAPI.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTasksAPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
    });
    builder.addCase(getTasksAPI.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // create task
    builder.addCase(fetchTasksAPI.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTasksAPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks.unshift(action.payload);
    });
    builder.addCase(fetchTasksAPI.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // update
    builder.addCase(updateTasksAPI.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateTasksAPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
    });
    builder.addCase(updateTasksAPI.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // delete
    builder.addCase(deleteTaskAPI.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTaskAPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = state.tasks.filter(
        (task) => task._id !== action.payload
      );
    });
    builder.addCase(deleteTaskAPI.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
export default taskSlice.reducer;
