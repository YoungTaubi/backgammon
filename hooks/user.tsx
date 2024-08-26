import { db } from "@/firebase/config";
import { User } from "@/lib/features/userSlice";
import { doc, collection, getDocs, query, updateDoc, setDoc, deleteDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useAppSelector } from "@/lib/store";
import { useEffect } from "react";
import { AppDispatch } from "@/lib/store";
import { setCurrentUser } from "@/lib/features/userSlice"
import { useDispatch } from "react-redux";

export function getAllUsers() {
    return new Promise(async (resolve) => {
        // get all users
        const allUsers = await getDocs(query(collection(db, "users")));
        if (!allUsers) {
            resolve(null);
        } else {
            resolve(allUsers.docs.map(doc => {
                return {
                    userName: doc.data().userName,
                    id: doc.data().id,
                    isOnline: false
                }
            }));
        }
    });
}

export function useGetMyUser() {
    const authUser = useAppSelector((state) => state.userSelector.authUser);
    const myId = authUser.uid

    const [myUser] = useDocumentData(doc(db, "users", myId));

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (myUser) {
            dispatch(setCurrentUser(myUser));
        }
        return
    }, [myUser])
    return myUser;
}

export async function setUserStatus(userId: string, isOnline: boolean) {
    await updateDoc(doc(db, "users", userId), { isOnline: isOnline });
}

export async function sendFriendReq(myUser: User, friendUserId: string) {
    const ref = doc(db, "users", friendUserId, "friendRequests", myUser.id);
    await setDoc(ref, { statusPending: true, name: myUser.userName, id: myUser.id });
}

export async function acceptFriendReq(myUser: User, friendUserId: string) {
    const myUserId = myUser.id
    const requestRef = doc(db, "users", myUserId, "friendRequests", friendUserId);
    const myUserRef = doc(db, "users", myUserId);
    const myFriendRef = doc(db, "users", friendUserId);
    await updateDoc(myUserRef, { friends: arrayUnion(friendUserId) });
    await updateDoc(myFriendRef, { friends: arrayUnion(myUserId) });
    await deleteDoc(requestRef);
}

export async function deleteFriend(myUser: User, friendUserId: string) {
    const myUserId = myUser.id
    const myUserRef = doc(db, "users", myUserId);
    const myFriendRef = doc(db, "users", friendUserId);
    await updateDoc(myUserRef, { friends: arrayRemove(friendUserId) });
    await updateDoc(myFriendRef, { friends: arrayRemove(myUserId) });
}

