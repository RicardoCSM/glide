"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { DialogTimePickerInput } from "@/modules/Common/Components/Inputs/Dialogs/TimePickerInput";
import httpClient from "@/modules/Common/Services/http.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { LoaderCircle } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ClosingTimeDialogProps {
    isOpen: boolean;
    closingTime: Date;
    setClosingTime: Dispatch<SetStateAction<Date>>;
    setIsOpen: (value: boolean) => void;
}

const formSchema = z.object({
    closingTime: z.date()
});

const ClosingTimeDialog: React.FC<ClosingTimeDialogProps> = ({
    isOpen, setIsOpen, closingTime, setClosingTime
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            closingTime: closingTime
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            const response = await httpClient.post('/set_close_time', {
                horario_fechamento: `${values.closingTime.getHours()}:${values.closingTime.getMinutes()}`
            });

            if (response.data.status === 1) {
                setClosingTime(values.closingTime);
                toast({
                    title: "Sucesso!",
                    description: response.data.message
                })
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={isOpen ?
                () => setIsOpen(false) : () => setIsOpen(true)}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle autoFocus tabIndex={0}>Fechamento</DialogTitle>
                    <DialogDescription>Definir novo horário de fechamento</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField 
                            control={form.control}
                            name="closingTime"
                            render={({ field }) => (
                                <FormItem className="w-full flex justify-center">
                                    <DialogTimePickerInput
                                            date={field.value}
                                            setDate={field.onChange}
                                        />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="gap-3">
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                onClick={form.handleSubmit(onSubmit)}
                            >
                                {isLoading && (
                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Salvar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default ClosingTimeDialog;