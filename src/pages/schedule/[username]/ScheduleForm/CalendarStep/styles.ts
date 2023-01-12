import { Box, styled, Text } from "@ignite-ui/react";

export const Container = styled(Box, {
    margin: '$6 auto 0',
    padding: 0,
    display: 'grid',
    maxWidth: '100%',
    position: 'relative',

    variants: {
        isTimePickerOpen: {
            true: {
                gridTemplateColumns: '1fr 280px',

                '@media(max-width: 900px)': {
                    gridTemplateColumns: '1fr',
                },
            },
            false: {
                width: 540,
                gridTemplateColumns: '1fr',
            },
        },
    },

    
})

export const TimePicker = styled('div', {})

export const TimePickerHeader = styled(Text, {})

export const TimePickerList = styled('div', {})

export const TimePickerItem = styled('button', {})

