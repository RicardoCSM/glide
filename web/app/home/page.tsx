"use client";

import IUser from "@/modules/Auth/Interfaces/IUser";
import AppLayout from "@/modules/Common/Components/AppLayout/Index";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUserInfo } from "../auth";
import Loading from "@/modules/Common/Components/RootLayount/Loading";
import GlideDashboard from "@/modules/Glide/Components/Dashboard/GlideDashboard";
import { IGlide } from "@/modules/Glide/Interfaces/IGlide";
import httpClient from "@/modules/Common/Services/http.service";

export default function HomePage() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const [glide, setGlide] = useState<IGlide | null>(null);

    useEffect(() => {
        fetchUserInfo();
        fetchGlideData();
    }, []);

    const fetchUserInfo = async () => {
        const currentUserInfo: IUser = await getCurrentUserInfo();
        if (!currentUserInfo) {
            router.push('/login');
        }

        setCurrentUser(currentUserInfo);
    }

    const fetchGlideData = async () => {
        try {
            const response = await httpClient.get('/status');

            if(response.data.status === 1) {
                setGlide(response.data.response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {currentUser && glide ? (
                <AppLayout>
                    <div className="flex flex-col w-full h-full">
                        <GlideDashboard data={glide}/>
                    </div>
                </AppLayout>
            ) : (
                <Loading />
            )}
        </>
    );
}
