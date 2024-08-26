"use client"

import React from 'react';
import { useAppSelector } from "@/lib/store";
import { AppDispatch } from "@/lib/store";
import { useDispatch } from "react-redux";
import { setCurrentChatId } from '@/lib/features/chatSlice';




const ChatsList = () => {
    const myUser = useAppSelector((state) => state.userSelector.currentUser);

    const dispatch = useDispatch<AppDispatch>();

    const selectChat = (chatId: string) => {
        dispatch(setCurrentChatId(chatId));
    }

    return (
        <div>
            <h1>My Chats:</h1>
            <ul>
                {myUser?.chats?.map((chat: any) => (
                    <div key={chat.chatId}>
                        {chat?.chatPartnerName}
                        <button onClick={() => selectChat(chat.chatId)}>Open Chat</button>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default ChatsList;