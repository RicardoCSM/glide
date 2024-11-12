"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction, useState } from "react";
import IUser from "../../Interfaces/IUser";
import * as z from "zod";
import { modifiedEditCurrentUserSchema, currentUserEditSchema } from "../../Lib/Validations/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import DialogInputLayout from "@/modules/Common/Components/Inputs/Dialogs/_partials/DialogInputLayout";
import DialogDefautInput from "@/modules/Common/Components/Inputs/Dialogs/DialogDefaultInput";

interface CurrentUserEditDialogProps {
    user: IUser;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

type FormData = z.infer<typeof currentUserEditSchema>

const CurrentUserEditDialog: React.FC<CurrentUserEditDialogProps> = ({
    isOpen, setIsOpen, user,
}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(currentUserEditSchema),
        defaultValues: {
            name: user.name,
            email: user.email
        }
    })
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function onSubmit(data: FormData) {
        setIsLoading(true);
        try {
            const excludedKeys = ['current_password', 'password', 'password_confirmation'];

            const updatedData = Object.fromEntries(
                Object.entries(data).filter(([key, value]) => 
                    !excludedKeys.includes(key) && value !== user[key as keyof IUser])
            ) as Partial<modifiedEditCurrentUserSchema>;

            if (data.password !== "" && data.password_confirmation !== "") {
                updatedData.current_password = data.current_password;
                updatedData.password = data.password;
                updatedData.password_confirmation = data.password_confirmation;
            }

            window.location.reload();
        } catch {
            toast({
                title: "Algo deu errado.",
                description: "Não foi possível atualizar o usuário!",
                variant: "destructive",
            })
        }
        setIsLoading(false);
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={isOpen ?
                () => setIsOpen(false) : () => setIsOpen(true)}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle autoFocus tabIndex={0}>Editar informações</DialogTitle>
                    <DialogDescription>Editar informações do usuário atual</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <DialogDefautInput type="text" label="Nome" id="name" isLoading={isLoading} error={errors?.name} register={register} />
                    <DialogInputLayout id="login" label="Login">
                        <Input
                            id="login"
                            className="col-span-3"
                            value={user.login}
                            disabled={true}
                        />
                    </DialogInputLayout>
                    <DialogDefautInput type="text" label="Email" id="email" isLoading={isLoading} error={errors?.email} register={register} />
                    <DialogDefautInput type="password" label="Senha Atual" id="current_password" isLoading={isLoading} error={errors?.current_password} register={register} />
                    <DialogDefautInput type="password" label="Nova Senha" id="password" isLoading={isLoading} error={errors?.password} register={register} />
                    <DialogDefautInput type="password" label="Confirmar Senha" id="password_confirmation" isLoading={isLoading} error={errors?.password_confirmation} register={register} />
                    <DialogFooter className="gap-3">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancelar</Button>
                        </DialogClose>
                        <button className={cn(buttonVariants())} disabled={isLoading}>
                            {isLoading && (
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Salvar
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CurrentUserEditDialog;