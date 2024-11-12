"use client";

import React, { useEffect, useState } from "react";
import AppHeader from "./Header/AppHeader";
import { getCurrentUserInfo } from "@/app/auth";
import { useRouter } from "next/navigation";
import IUser from "@/modules/Auth/Interfaces/IUser";

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({
    children
}) => {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        const currentUserInfo = await getCurrentUserInfo();

        if (!currentUserInfo) {
            router.push('/login');
        }
        setCurrentUser(currentUserInfo);
    }

    return (
        <>
            {currentUser && (
                <>
                    <AppHeader
                        currentUser={currentUser}
                    />
                    <div className="flex h-screen border-collapse overflow-hidden">
                        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16 bg-secondary/10 pb-1">
                            {children}
                        </main>
                    </div>
                </>
            )}
        </>
    );
};

export default AppLayout;