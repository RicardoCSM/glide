"use client";

import { CpuIcon } from "lucide-react";

const RootLayoutLogo = () => {

    return (
        <div 
            className="flex w-full justify-center items-end p-2 gap-2 text-primary text-5xl font-semibold"
        >
            <CpuIcon size={48}/>
            Glide
        </div>
    );
}

export default RootLayoutLogo;