"use client"

import React, { useEffect, useState } from 'react';
import Signup from '@/app/components/signup';
import Login from '@/app/components/login';
import { useAuthUser } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/lib/store";
import { setAuthUser } from "@/lib/features/userSlice"
import { useDispatch } from "react-redux";
// import MultiPlayer from '@/mutliplayer/multiplayer';

const LoginPage = () => {

    const [loginform, setLoginForm] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined);

    const dispatch = useDispatch<AppDispatch>();
    const authUser = useAuthUser();
    const router = useRouter();

    useEffect(() => {
        if (authUser) {
            // send the user object to the store
            dispatch(setAuthUser(authUser));
            if (typeof window !== "undefined") {
                const stringifiedUser = JSON.stringify(authUser);
                localStorage.setItem("authUser", stringifiedUser);
            }
            // to-do: add multiplayer
            // new MultiPlayer({ name: user.userName, Id: user.id });

            router.push("/user-profile");
        } else if (authUser !== undefined) {
            setLoading(false);
        }
    }, [authUser]);

    useEffect(() => {
        console.error("Error"), error;
    }, [error]);

    return (
        <div>
            {loading ? <>Loading...</>
                :
                <>
                    <p>Login Page</p>
                    {loginform ?
                        <Login setError={setError} error={error} /> :
                        <Signup setError={setError} error={error} />
                    }
                    <button onClick={() => setLoginForm(!loginform)}>{loginform ? "Signup" : "Login"}</button>
                </>
            }
        </div>
    );
};

export default LoginPage;