"use client"

import { useState } from "react"
import IUser from "@/modules/Auth/Interfaces/IUser"
import { Button } from "@/components/ui/button"
import { LogOut, Settings } from "lucide-react"
import CurrentUserEditDialog from "@/modules/Auth/Components/Dialogs/CurrentUserEditDialog"
import { logout } from "@/app/auth"
import { useMediaQuery } from "@/modules/Common/Hooks/use-media-query"

interface AppHeaderMenuUserProps {
    currentUser: IUser;
}

const AppHeaderMenuUser: React.FC<AppHeaderMenuUserProps> = ({
    currentUser
}) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 769px)");

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
            {currentUser && (
                <>
                    <div className="flex items-center justify-start gap-4 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                            <p className="font-medium">{currentUser.name}</p>
                            <p className="w-[200px] truncate text-sm text-zinc-700">
                                {currentUser.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex w-full justify-between gap-2">
                        <Button
                            variant={isDesktop ? "ghost" : "outline"}
                            className="w-full"
                            onClick={() => setIsEditDialogOpen(true)}
                        >
                            <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
                            Editar
                        </Button>
                        {!isDesktop && (
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => signOut()}
                            >
                                <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                                Log Out
                            </Button>
                        )}
                    </div>
                    <CurrentUserEditDialog
                        isOpen={isEditDialogOpen}
                        setIsOpen={setIsEditDialogOpen}
                        user={currentUser}
                    />
                </>
            )}
        </>
    )
}

export default AppHeaderMenuUser;