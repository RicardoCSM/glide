"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

interface PreviewImageProps {
    isOpened: boolean;
}

const PreviewImage: React.FC<PreviewImageProps> = ({
    isOpened
}) => {
    const { resolvedTheme } = useTheme();

    return (
        <>
            {isOpened ? (
                <>
                    {resolvedTheme === "dark" ? (
                        <Image src="/images/DarkCurtainOpened.png" alt="" width={400} height={400} />
                    ) : (
                        <Image src="/images/LightCurtainOpened.png" alt="" width={400} height={400} />
                    )}
                </>
            ) : (
                <>
                    {resolvedTheme === "dark" ? (
                        <Image src="/images/DarkCurtainClosed.png" alt="" width={400} height={400} />
                    ) : (
                        <Image src="/images/LightCurtainClosed.png" alt="" width={400} height={400} />
                    )}
                </>
            )}
        </>
    )
}

export default PreviewImage;