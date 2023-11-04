import { createSlice } from "@reduxjs/toolkit";

interface IModalReviews {
    isModalOpen: boolean;
}

const initialState: IModalReviews = {
    isModalOpen: false,
}

const modalSlice = createSlice({
    name:"modal",
    initialState,
    reducers: {
        toggleModal: (state,action)=>{
            state.isModalOpen = action.payload
        }
    }
})

export const {toggleModal} = modalSlice.actions
export default modalSlice.reducer