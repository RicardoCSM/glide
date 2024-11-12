"use client"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AvatarIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { logout } from "@/app/auth"
import AppHeaderMenuUser from "./AppHeaderMenuUser"
import IUser from "@/modules/Auth/Interfaces/IUser"

interface AppHeaderMenuProps {
    currentUser: IUser;
}

const AppHeaderMenu: React.FC<AppHeaderMenuProps> = ({
    currentUser
}) => {

    const signOut = async () => {
        try {
            await logout();
            window.location.replace('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <NavigationMenu>
            <NavigationMenuList className="flex gap-3">
                <NavigationMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="ghost" size="icon">
                                <AvatarIcon
                                    className="h-8 w-8 cursor-pointer"
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <AppHeaderMenuUser currentUser={currentUser} />
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => signOut()}
                                >
                                    <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                                    Log Out
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu >
    )
}

export default AppHeaderMenu;