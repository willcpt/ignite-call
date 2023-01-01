import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../lib/axios";
import { Container, Header, Form, FormError } from "./styles";

const registerFormSchema = z.object({
    username: z.string()
        .min(3, { message: 'o usuário precisa ter pelo menos 3 letras.' })
        .regex(/^([a-z\\-]+)$/i, { message: 'O usuário pode ter apenas letras e hifens.' })
        .transform((username) => username.toLowerCase()),
    name: z.string()
        .min(3, { message: 'O nome precisa ter pelo menos 3 letras.'}),
})

type RegisterFromData = z.infer<typeof registerFormSchema>

export default function Register() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFromData>({
        resolver: zodResolver(registerFormSchema)
    })

    const router = useRouter()

    useEffect(() => {
        if (router.query.username) {
            setValue('username', String(router.query.username))
        }
    }, [router.query?.username, setValue])

    async function handleRegister(data: RegisterFromData) {
        
        try {
            await api.post('/users', {
                name: data.name,
                username: data.username,
            })

            await router.push('/register/connect-calendar')

        } catch (err) {
            console.log(err)
            if (err instanceof AxiosError && err?.response?.data?.message) {
                alert(err.response.data.message)
                return
            }
    
            console.log(err)
        }
        
        
    }

    return (
        <Container>
            <Header>
                <Heading as="strong"> Bem-vindo ao Ignite Call!</Heading>
                <Text>
                    Precisamos de algumas informações para criar seu perfil! Ah, você pode 
                    editar essas informações depois.
                </Text>

                <MultiStep size={4} currentStep={1} />
            </Header>

            <Form as="form" onSubmit={handleSubmit(handleRegister)}>
                <label>
                    <Text size="sm">Nome de usuário</Text>
                    <TextInput prefix="ignite.com/" placeholder="Seu usuário"  {...register('username')} />

                    {errors.username && (
                        <FormError size="sm">{errors.username.message}</FormError>
                    )}
                </label>
                
                <label>
                    <Text size="sm">Nome completo</Text>
                    <TextInput placeholder="seu nome" {...register('name')} />
                    {errors.name && (
                        <FormError size="sm">{errors.name.message}</FormError>
                    )}
                </label>

                <Button type="submit">
                    Próximo passo
                    <ArrowRight />
                </Button>
            </Form>

        </Container>
    )
}