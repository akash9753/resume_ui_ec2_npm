import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const signin = createAsyncThunk(
  "auth/login",
  async ({ formData, navigate, toast },{rejectWithValue}) => {
    try {
      const response = await api.signIn(formData);
      toast.success("Signin Successfully");
      navigate("/resumeForm");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const signup = createAsyncThunk(
    "auth/signup",
    async ({ formData, navigate, toast },{rejectWithValue}) => {
      try {
        const response = await api.signUp(formData);
        if(response.data.success === true){
          toast.success(response.data.message);
          navigate("/signin");
          return response.data;
        }else{

        }
        
      } catch (err) {
        console.log(err)
        toast.error(err.response.data.message);
        return rejectWithValue(err.response.data)
      }
    }
  );

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  reducers:{
    setUser:(state,action) =>{
        state.user=action.payload
    },
    setLogout:(state,action)=>{
        state.user = null;
        sessionStorage.clear()
    }
  },
  extraReducers: (builder)=>{
    builder
     .addCase(signin.pending, (state, action) => {
        state.loading = true;
      })
    .addCase(signin.fulfilled, (state, action) => {
      state.loading = false;
      sessionStorage.setItem("userDetail", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
      state.error = "";
    })
    .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(signup.pending, (state, action) => {
        state.loading = true;
      })
    .addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
      
    })
    .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
  },
});

export const {setUser,setLogout} = authSlice.actions;

export default authSlice.reducer;