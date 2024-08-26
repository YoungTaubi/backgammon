"use client"

import { useAuthUser } from "@/hooks/auth";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    const authUser = useAuthUser();
    const router = useRouter();

    if (authUser === undefined) {
        return <>Loading...</>
    } else if (!authUser && typeof window !== "undefined") {
        router.push("/login");
        return <>Loading...</>
    }
    return children
}