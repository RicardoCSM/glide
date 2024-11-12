"use client";

import { useState, useEffect } from "react";
import { MenuIcon, Moon, Sun } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import AppHeaderMenuUser from "./AppHeaderMenuUser";
import { logout } from "@/app/auth"
import IUser from "@/modules/Auth/Interfaces/IUser";
import AppMobileHeaderThemeToggleMenu from "./AppMobileHeaderThemeToggle";

interface AppMobileHeaderMenu {
    currentUser: IUser;
}

const AppMobileHeaderMenu: React.FC<AppMobileHeaderMenu> = ({
    currentUser
}) => {
    const [open, setOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isThemeToggleOpen, setIsThemeToggleOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            setOpen(!open);
        }
    }, [isThemeToggleOpen]);

    if (!isMounted) {
        return null;
    }

    const signOut = async () => {
        try {
            await logout();
            window.location.replace('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <div className="flex items-center justify-center gap-2 cursor-pointer rounded-full bg-background text-foreground">
                        <MenuIcon />
                    </div>
                </SheetTrigger>
                <SheetContent side="top" className="w-full rounded-b-xl" onOpenAutoFocus={(e) => e.preventDefault()}>
                    <div className="flex flex-col px-1 py-6 gap-4">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => setIsThemeToggleOpen(true)}
                        >
                            <Sun className="h-4 w-4 mr-2 block dark:hidden" aria-hidden="true" />
                            <Moon className="h-4 w-4 mr-2 hidden dark:block" aria-hidden="true" />
                            Alterar tema
                        </Button>
                        <div className="border rounded-md p-2">
                            <AppHeaderMenuUser currentUser={currentUser} />
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
            <AppMobileHeaderThemeToggleMenu isOpen={isThemeToggleOpen} setIsOpen={setIsThemeToggleOpen} />
        </>
    );
};

export default AppMobileHeaderMenu;