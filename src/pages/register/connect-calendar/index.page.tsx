import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Container, Header, Form, FormError } from "../styles";
import { ConnectItem, ConnectBox} from "./styles"




export default function Connect() {
  const session = useSession()

    return (
        <Container>
            <Header>
                <Heading as="strong">Conecte sua agenda!</Heading>
                <Text>
                    Conecte o seu caledário para verificar automaticamente as horas
                    ocupadas e os novos eventos à medida em que são agendados.
                </Text>

                <MultiStep size={4} currentStep={2} />
            </Header>

            <ConnectBox>
                <ConnectItem>
                    <Text>Google Calendar</Text>
                    <Button variant="secondary" size="sm" onClick={() => signIn('google')}>
                        Conectar
                        <ArrowRight />
                    </Button>
                </ConnectItem>

                <Text>{JSON.stringify(session.data)}</Text>

                <Button type="submit">
                    Próximo passo
                    <ArrowRight />
                </Button>
            
            </ConnectBox>
        </Container>
    )
}