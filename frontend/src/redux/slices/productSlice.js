import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../axios.js";

let initialState = {
  loading: false,
  products: [],
  productCount: 0,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
        
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload?.products;
        state.productCount = action.payload?.size;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(fetchProductCat.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(fetchProductCat.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload?.products;
        state.productCount = action.payload?.size;
      })
      .addCase(fetchProductCat.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading=true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state,action) => {
        state.loading=false;
        state.products = action.payload.product;
        state.productCount=1;
        state.error=null;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })

  },
});


export const fetchProduct = createAsyncThunk("fetch_product", async (keyword="",{rejectWithValue}) => {
  try {
    
    const response=await fetch(`/api/v2/products/?type=${keyword}`);
    const result=await response.json();
    return result;
     
  } catch (error) {
    console.log(error)
    return rejectWithValue(error);
  }
});
export const fetchProductCat = createAsyncThunk("fetchProductCat", async (keyword="",{rejectWithValue}) => {
  try {
    const response=await fetch(`/api/v2/products/?category=${keyword}`);
    const result=await response.json();
    return result;
     
  } catch (error) {
    console.log(error)
    return rejectWithValue(error);
  }
});

export const fetchSingleProduct = createAsyncThunk("fetchSingleProduct", async (id,{rejectWithValue}) => {
  try{
    const response = await fetch(`/api/v2/product/${id}`);
    const result= await response.json();
    return result

  }catch(error){
    console.log(error);
    return rejectWithValue(error);
  }
});



export default productSlice.reducer;
// export const  {filter} = productSlice.actions

// export const {} = productSlice.actions;
