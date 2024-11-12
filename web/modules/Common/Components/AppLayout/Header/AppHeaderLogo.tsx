"use client";

import { CpuIcon } from "lucide-react";

const AppHeaderLogo = () => {

    return (
        <div 
            className="flex w-full justify-center items-end p-2 gap-2 text-primary text-4xl font-semibold"
        >
            <CpuIcon size={36}/>
            Glide
        </div>
    );
}

export default AppHeaderLogo;