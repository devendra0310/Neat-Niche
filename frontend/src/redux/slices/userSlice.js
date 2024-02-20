import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import {toast} from 'react-toastify'

let initialState={
    loading:false,
    isAuthenticated:false,
    error:null,
    user:{}
};

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.
        addCase(updateDetails.pending, (state,_) => {
            state.loading=true;
        })
        .addCase(updateDetails.fulfilled, (state,action) => {
            state.loading=false;
            state.error=null;
            state.isAuthenticated=action.payload.success;
            state.user=action.payload.user;
            // toast.success(action.payload.message)
        })
        .addCase(updateDetails.rejected , (state,action) => {
            state.error=action.error;
            state.loading=false;
        })
    }
})


export const updateDetails = createAsyncThunk("updateDetails", async(data,{rejectWithValue}) => {
    console.log(data);
    try{
        const response = await fetch('/me/update',{
            method:'PUT',
            header:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        console.log(response);
        const result=await response.json();
        console.log("2")
        console.log(result);
        return result
    }
    catch(error){
        console.log(error);
        return rejectWithValue(error);
    }
})

export const updatePassword = createAsyncThunk("updatePassword", async(data,{rejectWithValue}) => {
    try{
        const response = await fetch('/password/update',{
            method:'PUT',
            header:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const result=await response.json();
        console.log(result);
        return result
    }
    catch(error){
        console.log(error);
        return rejectWithValue(error);
    }
})

export default userSlice.reducer;