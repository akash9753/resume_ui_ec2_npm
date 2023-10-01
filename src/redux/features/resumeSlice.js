import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const resumeFormDataPost = createAsyncThunk(
  "resumeForm/resumeFormDataPost",
  async ({ formDataa, openModal }, { rejectWithValue }) => {
    try {
      const response = await api.resumeFormDataPost(formDataa);
      
      if (response.data.success === true) {
        openModal(response.data.message, response.data.success);
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const allResumeByUserId = createAsyncThunk(
  "resumeForm/allResumeByUserId",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await api.allResumeByUserId(userId);
      if (response.data.success === true) {
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resumeById = createAsyncThunk(
  "resumeForm/resumeByResumeId",
  async ({ resumeId }, { rejectWithValue }) => {
    try {
      const response = await api.resumeByResumeId(resumeId);
      if (response.data.success === true) {
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteByResumeId = createAsyncThunk(
  "resumeForm/deleteByResumeId",
  async ({ resumeId, openModal }, { rejectWithValue }) => {
    try {
      const response = await api.deleteByResumeId(resumeId); // Replace with your API call
      console.log(response);
      if (response.data.success === true) {
        
        openModal(response.data.message, response.data.success);
        console.log(response);
        return response.data;
      }
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateResumeDataById = createAsyncThunk(
  "resumeForm/updateResumeDataById",
  async ({ resumeId, formDataa, openModal }, { rejectWithValue }) => {
    try {
      const response = await api.updateResumeById(resumeId, formDataa);
      console.log(response)
      if (response.data.success === true) {
        console.log(response.data);
        openModal(response.data.message, response.data.success);
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const resumeSlice = createSlice({
  name: "resumeForm",
  initialState: {
    resumeFormData: [],
    allResumeByU:[],
    resumeByResumeId:{},
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(resumeFormDataPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(resumeFormDataPost.fulfilled, (state, action) => {
        state.loading = false;
        state.resumeFormData = action.payload;
        state.error = "";
      })
      .addCase(resumeFormDataPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(allResumeByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(allResumeByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.allResumeByU = action.payload;
        state.error = "";
      })
      .addCase(allResumeByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(resumeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(resumeById.fulfilled, (state, action) => {
        
        state.resumeByResumeId = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(resumeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteByResumeId.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteByResumeId.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(deleteByResumeId.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.error = action.payload.message;
      })
      .addCase(updateResumeDataById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateResumeDataById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        // Update state properties accordingly after a successful update
      })
      .addCase(updateResumeDataById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        // Handle the error state after a failed update
      });
  },
});

export default resumeSlice.reducer;
