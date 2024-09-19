import {createSlice} from "@reduxjs/toolkit"

const initialState={
    products:[]
}

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addProduct:(state, action)=>{
            state.products.push(  action.payload);
        },
        deleteProduct:(state, action)=>{
            state.products=state.products.filter((product)=>product !== action.payload);
        }
    }
})

export const {addProduct, deleteProduct}=cartSlice.actions;
export default cartSlice.reducer;