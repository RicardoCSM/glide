"use client";

import RootLayoutLogo from "./RootLayoutLogo";

interface LoadingProps {
    message?: string;
    error?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
    message, error
}) => {

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-3 bg-secondary/10">
            <div className="flex flex-col items-center md:items-end">
                <RootLayoutLogo />
            </div>
            <div className="flex items-center justify-center space-x-2">
                {message ? (
                    <div className="text-lg">
                        {error && (
                            <span className="text-red-600 pr-2">Erro: </span>
                        )}
                        {message}
                    </div>
                ) : (
                    <>
                        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
                        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
                        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Loading;