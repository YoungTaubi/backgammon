"use client"

import { useEffect, useState } from "react";
import { signOut as firebaseSignOut, browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/config";
import { setDoc, doc, collection } from "firebase/firestore";
import { setUserStatus } from '@/hooks/user';

let myAuthUser: any = null;

export async function signIn(email: string, password: string, rememberMe: boolean = false) {
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
    return signInWithEmailAndPassword(auth, email, password);
}

export async function signUp(email: string, password: string, userName: string) {
    const createUser = async () => {
        const newUser = await createUserWithEmailAndPassword(auth, email, password);
        if (newUser) {
            const usersRef = collection(db, "users");
            await setDoc(doc(usersRef, newUser.user.uid), {
                id: newUser.user.uid,
                userName,
                isOnline: true
            })
        }
    }
    return createUser();
}

export async function signOut() {
    /*
    remove current user from local storage 
    make sure this only happens on client site
    */
    if (typeof window !== "undefined") {
        localStorage.removeItem('authUser');
        setUserStatus(myAuthUser.uid, false);
    }
    return firebaseSignOut(auth);
}

export function useAuthUser() {
    const [authUser, setAuthUser] = useState<any | null | undefined>(undefined);

    useEffect(() => {
        return onAuthStateChanged(auth, async (user) => {
            if (user && !authUser) {
                setAuthUser(user);
                //to-do: find out what the actual issue is when signing up, some timing issue => remove setTimeout
                setTimeout(() => {
                    setUserStatus(user.uid, true);
                }, 100);
                myAuthUser = user;
            } else {
                setAuthUser(null);
            }
        });
    }, []);

    return authUser;
}