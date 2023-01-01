import { Button, TextInput, Text } from "@ignite-ui/react";
import { ArrowArcRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormAnnotation } from "./styles";
import { useRouter } from "next/router";
import { useEffect } from "react";

const claimUsenameFormSchema = z.object({
    username: z.string()
        .min(3, { message: 'o usuário precisa ter pelo menos 3 letras.' })
        .regex(/^([a-z\\-]+)$/i, { 
            message: 'O usuário pode ter apenas letras e hifens.', 
        })
        .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsenameFormSchema>

export function ClaimUsenameForm() {
    const { 
        register, 
        handleSubmit, 
        
        formState: { errors },
     } = useForm<ClaimUsernameFormData>({
        resolver: zodResolver(claimUsenameFormSchema),
    })

    const router = useRouter()

    

    async function handleClaimUsername(data: ClaimUsernameFormData) {
        console.log(data)
        const { username } = data

        await router.push(`/register?username=${username}`)
    }

    return (
    <>    
        <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
            <TextInput 
                size="sm" 
                prefix="ignite.com/" 
                placeholder="seu-usuario" 
                {...register('username')}
            />
            <Button size="sm" type="submit">
                Reservar usuário
                <ArrowArcRight />
            </Button>
        </Form>
        <FormAnnotation>
                <Text size="sm"> 
                    {errors.username
                      ? errors.username.message
                      : 'Digite o nome do usuário desejado'
                    }
                </Text>
        </FormAnnotation>
    </>
    )
}