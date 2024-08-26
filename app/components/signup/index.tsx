"use client"

import { useState } from "react";
import React from 'react';
import { signUp } from '@/hooks/auth';
import { useRouter } from "next/navigation";

const initState = {
    eMail: "",
    password: "",
    userName: ""
}

type Props = {
    setError: React.Dispatch<React.SetStateAction<undefined>>,
    error: any
}

const Signup = ({ setError, error }: Props) => {
    const [unserInfo, setUserInfo] = useState(initState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setUserInfo((prev) => ({ ...prev, [key]: event.target.value }));
    }

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            await signUp(unserInfo.eMail, unserInfo.password, unserInfo.userName);
            setError(undefined);
            setUserInfo(initState);
        } catch (err: any) {
            const errorCode = err.code;
            const errorMessage = err.message;
            setError(errorCode);
            console.error(errorCode, errorMessage);
        }
    }

    return (
        <div>
            <h2>Sign Up: </h2>
            <form action="submit" onSubmit={handleSubmit} style={{ color: "black" }}>
                <input type="text" placeholder="eMail" value={unserInfo.eMail} onChange={(event) => handleChange(event, "eMail")} />
                <input type="password" placeholder="Password" value={unserInfo.password} onChange={(event) => handleChange(event, "password")} />
                <input type="text" placeholder="Name" value={unserInfo.userName} onChange={(event) => handleChange(event, "userName")} />
                <button style={{ color: "white" }} type="submit">Sign Up</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Signup;