"use client"

import React from 'react';
import { signOut } from "@/hooks/auth";

const Logout = () => {
    const logout = () => {
        signOut();
    }

    return (
        <button onClick={logout}>Logout</button>
    );
};

export default Logout;