import { Heading, Text } from "@ignite-ui/react";
import Image from 'next/image'
import { Container, Hero, Preview } from "./styles";

import previewImage from '../../assets/app-preview.png'
import { ClaimUsenameForm } from "./components/ClaimUsernameForm";


export default function Home() {
    return (
        <Container>
            <Hero>
                <Heading size="4xl">Agendamento descomplicado</Heading>
                <Text size="xl">
                    Conecte seu calendário e permita que pessoas marquem agendamentos 
                    no seu tempo livre.
                </Text>

                <ClaimUsenameForm />
            </Hero>

            <Preview>
                <Image 
                    src={previewImage}
                    height={400}
                    quality={100}
                    priority
                    alt="Calendário simbolizando aplicação"
                />

            </Preview>
        </Container>
    )
}