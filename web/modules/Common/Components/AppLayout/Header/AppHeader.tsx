"use client"

import { useMediaQuery } from "@/modules/Common/Hooks/use-media-query";
import AppHeaderMenu from "./AppHeaderMenu";
import AppMobileHeaderMenu from "./AppMobileHeaderMenu";
import IUser from "@/modules/Auth/Interfaces/IUser";
import ThemeToggle from "../../RootLayount/ThemeToggle";
import AppHeaderLogo from "./AppHeaderLogo";

interface AppHeaderProps {
    currentUser: IUser;
}

const AppHeader: React.FC<AppHeaderProps> = ({
    currentUser
}) => {
    const isDesktop = useMediaQuery("(min-width: 769px)");

    return (
        <div className="fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
            <nav className="flex h-16 items-center justify-between pe-4">
                <div className="flex items-center gap-3">
                    <AppHeaderLogo />
                </div>
                <div className="flex items-center gap-5 md:gap-3">
                    {isDesktop ? (
                        <>
                            <ThemeToggle />
                            <AppHeaderMenu currentUser={currentUser}/>
                        </>
                    ) : (
                        <AppMobileHeaderMenu 
                            currentUser={currentUser} 
                        />
                    )}
                </div>
            </nav>
        </div>
    )
}

export default AppHeader;