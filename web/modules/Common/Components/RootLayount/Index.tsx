"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import RootLayoutLogo from "./RootLayoutLogo";

interface RootLayoutProps {
    children: React.ReactNode;
    back_url?: string;
    next_url?: string;
    next_label?: string;
    title: string;
    description: string;
}

const RootLayout: React.FC<RootLayoutProps> = ({
    children, back_url, title, description, next_url, next_label
}) => {

    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            {back_url && (
                <Link
                    href={back_url}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute left-4 top-4 md:left-8 md:top-8"
                    )}
                >
                    <>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Voltar
                    </>
                </Link>
            )}
            <div className="absolute right-4 top-4 md:right-8 md:top-8">
                <ThemeToggle />
            </div>
            <div className="mx-auto flex w-full flex-col justify-center sm:w-[350px]">
                <div className="flex flex-col items-center md:items-end">
                    <RootLayoutLogo />
                </div>
                <div className="space-y-6">
                    <div className="flex flex-col space-y-2 items-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {title}
                        </h1>
                        <p className="text-sm text-muted-foreground text-center">
                            {description}
                        </p>
                    </div>
                    <div className="px-6">
                        {children}
                    </div>
                    {(next_url && next_label) && (
                        <p className="p-8 text-center text-sm text-muted-foreground">
                            <Link
                                href={next_url}
                                className="hover:text-brand underline underline-offset-4"
                            >
                                {next_label}
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RootLayout;