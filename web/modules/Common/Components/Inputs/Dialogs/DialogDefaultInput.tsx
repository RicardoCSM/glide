"use client";

import { Input } from "@/components/ui/input";
import { FieldError, UseFormRegister } from "react-hook-form";
import DialogInputLayout from "./_partials/DialogInputLayout";

interface DialogDefautInputProps {
    id: string;
    label: string;
    isLoading: boolean;
    error?: FieldError;
    register: UseFormRegister<any>;
    value?: string;
    type: string;
}

const DialogDefautInput: React.FC<DialogDefautInputProps> = ({
    id, label, isLoading, error, register, type
}) => {

    return (
        <DialogInputLayout id={id} label={label} error={error}>
            <Input
                id={id}
                type={type}
                className="col-span-3"
                {...register(id)}
                disabled={isLoading}
            />
        </DialogInputLayout>
    )
}

export default DialogDefautInput;