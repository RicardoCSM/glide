"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PauseCircleIcon, PlayCircleIcon } from "lucide-react";
import React, { useState } from "react";
import PreviewImage from "./_partials/PreviewImage";
import OpeningTimeDialog from "./_partials/Dialogs/OpeningTimeDialog";
import ClosingTimeDialog from "./_partials/Dialogs/ClosingTimeDialog";
import { IGlide } from "../../Interfaces/IGlide";
import httpClient from "@/modules/Common/Services/http.service";
import { toast } from "@/hooks/use-toast";

interface GlideDashboardProps {
    data: IGlide;
}

const GlideDashboard: React.FC<GlideDashboardProps> = ({
    data
}) => {
    const [openingHours, openingMinutes] = data.horario_abertura.split(":").map(Number);
    const [closingHours, closingMinutes] = data.horario_fechamento.split(":").map(Number);
    const [openingTime, setOpeningTime] = useState<Date>(new Date(0, 0, 0, openingHours, openingMinutes));
    const [closingTime, setClosingTime] = useState<Date>(new Date(0, 0, 0, closingHours, closingMinutes));
    const [isOpeningTimeDialogOpen, setIsOpeningTimeDialogOpen] = useState(false);
    const [isClosingTimeDialogOpen, setIsClosingTimeDialogOpen] = useState(false);
    const [isOpened, setIsOpened] = useState(data.aberto);

    const handleOpen = async () => {
        try {
            const response = await httpClient.post('/open');
            if(response.data.status === 1) {
                setIsOpened(true);
                toast({
                    "title": "Sucesso!",
                    "description": "Cortina aberta com sucesso!",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = async () => {
        try {
            const response = await httpClient.post('/close');
            if(response.data.status === 1) {
                setIsOpened(false);
                toast({
                    "title": "Sucesso!",
                    "description": "Cortina fechada com sucesso!",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="py-6 px-2 w-full mx-auto space-y-4">
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-6">
                <Card className="lg:col-span-4">
                    <CardHeader className="space-y-0 pb-2">
                        <CardTitle className="text-3xl">
                            Estado Atual:{"   "}
                            <span className="font-sans text-2xl font-normal tracking-normal text-muted-foreground">
                                {isOpened ? "Aberta" : "Fechada"}
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="w-full flex justify-center">
                        <PreviewImage isOpened={isOpened} />
                    </CardContent>
                </Card>
                <div className="flex flex-col h-full lg:col-span-2 gap-8 w-full">
                    <div className="flex flex-row lg:flex-col h-1/2 justify-between w-full gap-2">
                        <Card 
                            onClick={() => setIsOpeningTimeDialogOpen(true)}
                            className="w-1/2 lg:w-full cursor-pointer">
                            <CardContent className="p-4">
                                <div className="text-xl">Abrir ás:</div>
                                <div className="text-4xl font-semibold">
                                    {openingTime.toLocaleTimeString()}
                                </div>
                            </CardContent>
                        </Card>
                        <OpeningTimeDialog 
                            isOpen={isOpeningTimeDialogOpen}
                            setIsOpen={setIsOpeningTimeDialogOpen}
                            openingTime={openingTime}
                            setOpeningTime={setOpeningTime}
                        />
                        <Card className="w-1/2 lg:w-full">
                            <CardContent 
                                onClick={() => setIsClosingTimeDialogOpen(true)}
                                className="p-4 cursor-pointer">
                                <div className="text-xl">Fechar ás:</div>
                                <div className="text-4xl font-semibold">
                                    {closingTime.toLocaleTimeString()}
                                </div>
                            </CardContent>
                        </Card>
                        <ClosingTimeDialog 
                            isOpen={isClosingTimeDialogOpen}
                            setIsOpen={setIsClosingTimeDialogOpen}
                            closingTime={closingTime}
                            setClosingTime={setClosingTime}
                        />
                    </div>
                     <div className="flex w-full h-1/2 items-center">
                        <div className="flex flex-row w-full gap-2 justify-around p-4">
                            <Button onClick={() => handleOpen()} size="lg">
                                <div className="pr-2">
                                    <PlayCircleIcon size={24} />
                                </div>
                                <p className="font-semibold text-lg">Abrir</p>
                            </Button>
                            <Button onClick={() => handleClose()} size="lg">
                                <div className="pr-2">
                                    <PauseCircleIcon size={24} />
                                </div>
                                <p className="font-semibold text-lg">Fechar</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GlideDashboard;