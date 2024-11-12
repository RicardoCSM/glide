"use client";

import { Label } from "@/components/ui/label";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface DialogInputLayoutProps {
    id: string;
    label: string;
    error?: FieldError | Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<{ label: string; value: string; disable: NonNullable<boolean | undefined>; }>> | undefined)[]>;
    children: React.ReactNode;
}

const DialogInputLayout: React.FC<DialogInputLayoutProps> = ({
    id, label, children, error
}) => {

    return (
        <div className="grid grid-cols-4 items-center text-right gap-3">
            <Label htmlFor={id} className="break-words text-right max-w-full">{label}</Label>
            {children}
            {error && (
                <div className="col-span-4">
                    <p className="text-xs text-red-600">
                        {error.message}
                    </p>
                </div>
            )}
        </div>
    )
}

export default DialogInputLayout;