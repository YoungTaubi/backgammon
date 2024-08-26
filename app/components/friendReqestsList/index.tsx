"use client"

import React from 'react';
import { useAppSelector } from "@/lib/store";
import { useCollectionData, } from 'react-firebase-hooks/firestore';
import { db } from '@/firebase/config';
import { collection, query } from "firebase/firestore"
import { acceptFriendReq } from '@/hooks/user';

const FriendReqestsList = () => {
    const myUser = useAppSelector((state) => state.userSelector.currentUser);
    console.log("myUser", myUser);

    const q = query(collection(db, "users", myUser.id, "friendRequests"));
    const [friendRequests] = useCollectionData(q);

    return (
        <div>
            <h1>Friend Requests:</h1>
            <ul>
                {friendRequests?.map(user => (
                    <div key={user.id}>{user.name}
                        <button onClick={() => acceptFriendReq(myUser, user.id)}>Accept Request</button>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default FriendReqestsList;