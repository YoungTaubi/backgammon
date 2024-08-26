"use client"

import React from 'react';
import { useAppSelector } from "@/lib/store";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '@/firebase/config';
import { collection, query } from "firebase/firestore"
import { sendFriendReq } from '@/hooks/user';

const UserList = () => {
    const myUser = useAppSelector((state) => state.userSelector.currentUser);

    const q = query(collection(db, "users"));
    const [userList] = useCollectionData(q);

    const filterdUserList = userList?.filter(user => user.id !== myUser.id);

    return (
        <div>
            <h1>UserList:</h1>
            <ul>
                {filterdUserList?.map(user => (
                    <div key={user.id}>{user.userName}
                        {myUser &&
                            <button onClick={() => sendFriendReq(myUser, user.id)}>Add Friend</button>
                        }
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default UserList;