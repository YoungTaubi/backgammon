import { createSlice } from "@reduxjs/toolkit";

export type AuthUser = {
    uid: string,
}

export type User = {
    userName: string,
    id: string,
    isOnline: boolean,
    friends: Array<string>,
    chats: Array<string>
}

interface UserState {
    authUser: AuthUser;
    currentUser: any;
};

const loadAuthUserState = () => {
    try {
        // make sure this only happens on client site
        if (typeof window !== "undefined") {
            const authUser = localStorage.getItem('authUser');
            if (authUser === null) {
                return undefined;
            }
            return JSON.parse(authUser);
        }
    } catch (err) {
        console.error("err", err);
        return undefined;
    }
}

const initialState: UserState = {
    authUser: loadAuthUserState(),
    currentUser: {
        userName: " ",
        id: " ",
        isOnline: false,
        friends: [],
        chats: []
    }
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthUser: (state, action) => { state.authUser = action.payload },
        setCurrentUser: (state, action) => { state.currentUser = action.payload }
    },
});

export const { setAuthUser, setCurrentUser } = userSlice.actions;

export default userSlice.reducer;