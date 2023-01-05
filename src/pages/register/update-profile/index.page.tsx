import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, Heading, MultiStep, Text, TextArea } from "@ignite-ui/react";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../lib/axios";
import { buildNextAuthOptions } from "../../api/auth/[...nextauth].api";

import { Container, Header } from "../styles";
import { FormAnnotation, ProfileBox } from "./styles";

const updateProfileFormSchema = z.object({
    bio: z.string(),
})

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>

export default function UpdateProfile() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<UpdateProfileFormData>({
        resolver: zodResolver(updateProfileFormSchema)
    })

    const session = useSession()
    const router = useRouter()

    console.log(session)

  

    async function handleUpdateProfile(data: UpdateProfileFormData) {
        
       await api.put('/users/profile', {
        bio: data.bio,
       })

       await router.push(`/schedule/${session.data?.user.username}`)
    }

    return (
        <Container>
            <Header>
                <Heading as="strong">Defina sua disponibilidade</Heading>
                <Text>
                    Por último, uma breve descrição e uma foto de perfil.
                </Text>

                <MultiStep size={4} currentStep={4} />
            </Header>

            <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
                <label>
                    <Text size="sm">Foto de perfil</Text>
                    <Avatar src={session.data?.user.avatar_url} />
                </label>
                
                <label>
                    <Text size="sm">Sobre você</Text>
                    <TextArea {...register('bio')} />
                    <FormAnnotation>
                        Fale um pouco sobre você. Isto será exibido em sua página pessoal.
                    </FormAnnotation>
                </label>

                <Button type="submit" disabled={isSubmitting}>
                    Finalizar
                    <ArrowRight />
                </Button>
            </ProfileBox>

        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await unstable_getServerSession(
        req,
        res,
        buildNextAuthOptions(req, res),
    )
    return {
        props: {
            session,
        },
    }
}