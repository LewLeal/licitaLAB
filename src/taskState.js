import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTask = createAsyncThunk(
  "task/getTask",
  async (taskId, thunkAPI) => {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=1&limit=9"
    );
    console.log(response);
    const formatedResponse = await response.json();
    return formatedResponse;
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
  },
  extraReducers: {
    [getTask.pending]: (state) => {
      state.loading = true;
    },
    [getTask.fulfilled]: (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    },
    [getTask.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export default taskSlice.reducer;
