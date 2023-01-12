import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { CalendarBlank } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ConfirmForm, FormActions, FormError, FormHeader } from "./styles";

const confirmFormSchema = z.object({
    name: z.string().min(3, {message: 'O nome precisa no mínimo 3 caracteres'}),
    email: z.string().email({message: 'Digite um e-mail válido'}),
    observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<ConfirmFormData>({
        resolver: zodResolver(confirmFormSchema),
    })

    function handleConfirmScheduling(data: ConfirmFormData){
        console.log(data)
    }

    return (
        <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
            <FormHeader>
                <Text>
                    <CalendarBlank />
                    07 de Janeiro de 2022
                </Text>
                <Text>
                    11:00
                </Text>
            </FormHeader>

            <label>
                <Text size="sm">Nome completo</Text>
                <TextInput placeholder="Seu nome" {...register('name')}/>
                {errors.name && <FormError>{errors.name.message}</FormError>}
            </label>

            <label>
                <Text size="sm">Endereço de e-mail</Text>
                <TextInput type="email" placeholder="email@mail.com" {...register('email')}/>
                {errors.name && <FormError>{errors.name.message}</FormError>}
            </label>

            <label>
                <Text size="sm">Observações</Text>
                <TextArea {...register('observations')}/>
            </label>

            <FormActions>
                <Button type="button" variant="tertiary" >Cancelar</Button>
                <Button type="submit" disabled={isSubmitting}>Confirmar</Button>
            </FormActions>

        </ConfirmForm>
    )
}