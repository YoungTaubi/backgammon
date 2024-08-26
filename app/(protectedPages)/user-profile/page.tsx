"use client"

import FriendReqestsList from "@/app/components/friendReqestsList";
import FriendsList from "@/app/components/friendsList";
import UserList from "@/app/components/userList";
import { useGetMyUser } from "@/hooks/user";
import { useEffect } from "react";
import { AppDispatch } from "@/lib/store";
import { setCurrentUser } from "@/lib/features/userSlice"
import { useDispatch } from "react-redux";
import ChatsList from "@/app/components/chatsList";
import Chat from "@/app/components/chat";

const UserProfile = () => {
    const myUser = useGetMyUser();

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (myUser) {
            dispatch(setCurrentUser(myUser));
        }
    }, [myUser])

    return (
        <div>
            <h1>User Profile</h1>
            <p>my user name: {myUser?.userName}</p>
            < UserList />
            <FriendReqestsList />
            <FriendsList />
            <ChatsList />
            <Chat />
        </div>
    );
};

export default UserProfile;