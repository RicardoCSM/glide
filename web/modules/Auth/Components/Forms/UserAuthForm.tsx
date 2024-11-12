"use client"

import { cn } from "@/lib/utils"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { login } from "@/app/auth";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { userAuthSchema } from "../../Lib/Validations/auth";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(userAuthSchema),
    })
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    async function onSubmit(data: FormData) {
        setIsLoading(true);
        console.log(data);
        const success = await login();
        setIsLoading(false);
        if (success) {
            toast({
                title: "Usuário logado com sucesso!",
            });
            router.push('/home');
        } else {
            toast({
                title: "Algo deu errado.",
                description: "O seu login não pode ser realizado. Tente novamente!",
                variant: "destructive",
            })
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">
                        Usuário
                    </Label>
                    <Input
                        id="name"
                        disabled={isLoading}
                        {...register("login")}
                    />
                    {errors?.login && (
                    <p className="px-1 text-xs text-red-600">
                        {errors.login.message}
                    </p>
                    )}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">
                        Senha
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        disabled={isLoading}
                        {...register("password")}
                    />
                    {errors?.password && (
                    <p className="px-1 text-xs text-red-600">
                        {errors.password.message}
                    </p>
                    )}
                </div>
                <button className={cn(buttonVariants())} disabled={isLoading}>
                    {isLoading && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Entrar
                </button>
            </div>
        </form>
        </div>
    )
}

export default UserAuthForm;