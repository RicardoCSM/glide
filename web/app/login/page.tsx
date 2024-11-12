"use client";

import UserAuthForm from "@/modules/Auth/Components/Forms/UserAuthForm";
import RootLayout from "@/modules/Common/Components/RootLayount/Index";

export default function Login() {

    return (
        <RootLayout
            title="Seja bem-vindo de volta"
            description="Insira as credenciais de sua conta"
            next_label="Esqueceu a senha? Entre em contato"
            next_url="/forgot-password"
        >
            <UserAuthForm />
        </RootLayout>
    );
}