// import { createSlice } from "@reduxjs/toolkit";

// export const taskSlice = createSlice({
//   name: "task",
//   initialState: [
//     { id: 1, title: "task1", completed: false },
//     { id: 2, title: "task2", completed: false },
//     { id: 3, title: "task3", completed: true },
//     { id: 4, title: "task4", completed: false },
//     { id: 5, title: "task5", completed: false },
//   ],
//   reducers: {
//     addTask: (state, action) => {
//       const task = {
//         id: new Date(),
//         title: action.payload.title,
//         completed: false,
//       };
//       state.push(task);
//     },
//   },
// });

// export const { addTask } = taskSlice.actions;

// export default taskSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export const getTaskAsync = createAsyncThunk("task/getTaskAsync", async () => {
  const resp = await fetch("http://localhost:3000/task");
  if (resp.ok) {
    const task = await resp.json();
    return { task };
  }
});

export const addTaskAsync = createAsyncThunk(
  "task/addTaskAsync",
  async (payload) => {
    const resp = await fetch("http://localhost:3000/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: payload.title }),
    });

    if (resp.ok) {
      const task = await resp.json();
      return { task };
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "task/completeTodoAsync",
  async (payload) => {
    const resp = await fetch(`http://localhost:3000/todos/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: payload.completed }),
    });

    if (resp.ok) {
      const task = await resp.json();
      return { task };
    }
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "task/deleteTaskAsync",
  async (payload) => {
    const resp = await fetch(`http://localhost:3000/task/${payload.id}`, {
      method: "DELETE",
    });

    if (resp.ok) {
      return { id: payload.id };
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      const task = {
        id: nanoid(),
        title: action.payload.title,
        completed: false,
      };
      state.push(task);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTaskAsync.fulfilled]: (state, action) => {
      return action.payload.task;
    },
    [addTaskAsync.fulfilled]: (state, action) => {
      state.push(action.payload.task);
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      const index = state.findIndex(
        (task) => task.id === action.payload.task.id
      );
      state[index].completed = action.payload.task.completed;
    },
    [deleteTaskAsync.fulfilled]: (state, action) => {
      return state.filter((task) => task.id !== action.payload.id);
    },
  },
});

export const { addTas, toggleComplete, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
