"use client"

import React, { useEffect, useState } from 'react';
import { useAppSelector } from "@/lib/store";
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '@/firebase/config';
import { collection, doc, orderBy, query, addDoc, serverTimestamp } from "firebase/firestore"
import { User } from '@/lib/features/userSlice';
import { uid } from 'uid';


const Chat = () => {
    const myUser = useAppSelector((state) => state.userSelector.currentUser);
    const currentChatId = useAppSelector((state) => state.chatSelector.currentChatId);

    const messagesQuery = query(collection(db, "chats", currentChatId, "messages"), orderBy("timestamp"));

    const [chat] = useDocumentData(doc(db, "chats", currentChatId));
    const [messages] = useCollectionData(messagesQuery);


    const [messageText, setMessageText] = useState("");
    const [chatPartner, setChatPartner] = useState<User | null>(null);

    const sendMessage = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const messageId = uid(32);
        await addDoc(collection(db, "chats", currentChatId, "messages"), {
            text: messageText,
            senderId: myUser.id,
            id: messageId,
            timestamp: serverTimestamp()
        });
        setMessageText("");
    }

    useEffect(() => {
        if (chat) {
            const chatPartner = chat.chatPartners.filter((partner: any) =>
                partner.id !== myUser.id
            )
            setChatPartner(chatPartner[0]);
        }
    }, [chat]);

    return (
        <div>
            <h1>Chat with {chatPartner?.userName}</h1>
            {messages?.map(message => (
                <div key={message?.id}>
                    <p style={{ color: myUser.id === message.senderId ? "blue" : "orange" }}>{message?.text}</p>
                </div>
            ))}
            <form action=""></form>
            <form action="submit" onSubmit={sendMessage} style={{ color: "black" }}>
                <input type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)} />
                <button style={{ color: "white" }} type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default Chat;