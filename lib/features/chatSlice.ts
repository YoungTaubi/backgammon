import { createSlice } from "@reduxjs/toolkit";

type ChatState = {
    currentChatId: string,
}

const initialState: ChatState = {
    currentChatId: " ",
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setCurrentChatId: (state, action) => { state.currentChatId = action.payload },
    },
});

export const { setCurrentChatId } = chatSlice.actions;

export default chatSlice.reducer;