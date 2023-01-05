import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ArrowRight, Check } from "phosphor-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Container, Header, Form, FormError } from "../styles";
import { ConnectItem, ConnectBox, AuthError} from "./styles"




export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')

  }

  async function handleNavigateToNextStep(){
    await router.push('/register/time-intervals')
  }

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
                    {isSignedIn ? (
                        <Button size="sm" disabled>
                         Conectado
                         <Check />
                        </Button>
                    ) : (
                        <Button 
                            variant="secondary" 
                            size="sm" 
                            onClick={handleConnectCalendar}
                        >
                            Conectar
                            <ArrowRight />
                        </Button>
                    )}
                    
                </ConnectItem>

                {hasAuthError && (
                    <AuthError size="sm">
                        Falha ao se conctar ao Google, verifique se você habilitou as 
                        permissões de acesso ao Google Calendar.
                    </AuthError>
                )}

                <Button
                    onClick={handleNavigateToNextStep} 
                    type="submit" 
                    disabled={!isSignedIn}
                >
                    Próximo passo
                    <ArrowRight />
                </Button>
            
            </ConnectBox>
        </Container>
    )
}