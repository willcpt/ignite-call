import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ArrowRight, Check } from "phosphor-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


import { Container, Header, Form, FormError } from "../styles";
import { IntervalBox, IntervalDay, IntervalInputs, IntervalItem, IntervalsContainer } from "./styles";





export default function TimeIntervals () {
 

    return (
        <Container>
            <Header>
                <Heading as="strong">Quase lá!</Heading>
                <Text>
                    Defina o intervalo de horários que você está disponível em cada dia da semana.
                </Text>

                <MultiStep size={4} currentStep={3} />
            </Header>

            <IntervalBox as="form">
                <IntervalsContainer>
                    <IntervalItem>
                        <IntervalDay>
                            <Checkbox />
                            <Text>Segunda-feira</Text>
                        </IntervalDay>
                        <IntervalInputs>
                            <TextInput 
                                size="sm"
                                type="time"
                                step={60}
                            />
                        </IntervalInputs>
                    </IntervalItem>

                    <IntervalItem>
                        <IntervalDay>
                            <Checkbox />
                            <Text>Terça-feira</Text>
                        </IntervalDay>
                        <IntervalInputs>
                            <TextInput 
                                size="sm"
                                type="time"
                                step={60}
                            />
                        </IntervalInputs>
                    </IntervalItem>

                    <IntervalItem>
                        <IntervalDay>
                            <Checkbox />
                            <Text>Quarta-feira</Text>
                        </IntervalDay>
                        <IntervalInputs>
                            <TextInput 
                                size="sm"
                                type="time"
                                step={60}
                            />
                        </IntervalInputs>
                    </IntervalItem>

                    <IntervalItem>
                        <IntervalDay>
                            <Checkbox />
                            <Text>Quinta-feira</Text>
                        </IntervalDay>
                        <IntervalInputs>
                            <TextInput 
                                size="sm"
                                type="time"
                                step={60}
                            />
                        </IntervalInputs>
                    </IntervalItem>

                    <IntervalItem>
                        <IntervalDay>
                            <Checkbox />
                            <Text>Sexta-feira</Text>
                        </IntervalDay>
                        <IntervalInputs>
                            <TextInput 
                                size="sm"
                                type="time"
                                step={60}
                            />
                        </IntervalInputs>
                    </IntervalItem>
                </IntervalsContainer>

                <Button type="submit">
                    Próximo passo
                    <ArrowRight />
                </Button>
            </IntervalBox>
               
        </Container>
    )
}