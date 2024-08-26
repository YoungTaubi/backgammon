"use client"

import React, { useEffect, useState } from 'react';
import { useAppSelector } from "@/lib/store";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '@/firebase/config';
import { collection, query } from "firebase/firestore"
import { deleteFriend } from '@/hooks/user';
import { createChat } from '@/helpers/chat';


const FriendsList = () => {
    const myUser = useAppSelector((state) => state.userSelector.currentUser);

    const allUsersQuery = query(collection(db, "users"));
    const [allUsers] = useCollectionData(allUsersQuery);

    const [friendsList, setFriensList] = useState<Array<any>>([]);

    useEffect(() => {
        if (myUser && myUser.friends) {
            const filteredUser: any = allUsers?.filter(user => {
                if (myUser.friends.includes(user.id)) {
                    myUser?.chats?.forEach((chat: any) => {
                        if (chat.chatPartnerId === user.id) {
                            user.existingChat = true;
                        }
                    })
                    return user
                }
            }
            );
            setFriensList(filteredUser);
        }
    }, [myUser, allUsers]);

    return (
        <div>
            <h1>My Friends:</h1>
            <ul>
                {friendsList?.map(friend => (
                    <div key={friend?.id}>
                        <p>{friend?.userName}</p>
                        <p style={{ color: "green" }}>{friend.isOnline && "online"}</p>
                        {friend.existingChat ?
                            <button>Open Chat</button>
                            :
                            <button onClick={() => createChat(myUser, friend)}>Create Chat</button>
                        }
                        <button style={{ color: "red", borderColor: "red" }} onClick={() => deleteFriend(myUser, friend.id)}>Delete Friend</button>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default FriendsList;