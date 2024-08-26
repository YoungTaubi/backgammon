"use client"

import { useState } from "react";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

type Props = {
    setError: React.Dispatch<React.SetStateAction<undefined>>,
    error: any
}

const initState = {
    eMail: "",
    password: ""
}

const Login = ({ setError, error }: Props) => {
    const [cedentials, setCredentials] = useState(initState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setCredentials((prev) => ({ ...prev, [key]: event.target.value }));
    }

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, cedentials.eMail, cedentials.password);
            setCredentials(initState);
        } catch (err: any) {
            const errorCode = err.code;
            const errorMessage = err.message;
            setError(errorCode);
            console.error(errorCode, errorMessage);
        }
    }

    return (
        <div>
            <h2>Login: </h2>
            <form action="submit" onSubmit={handleSubmit} style={{ color: "black" }}>
                <input type="text" placeholder="eMail" value={cedentials.eMail} onChange={(event) => handleChange(event, "eMail")} />
                <input type="password" placeholder="Password" value={cedentials.password} onChange={(event) => handleChange(event, "password")} />
                <button style={{ color: "white" }} type="submit">Log in</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;


