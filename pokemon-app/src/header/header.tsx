import React from 'react';
import '../index.css'
import {createTheme, ThemeProvider, Typography} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF',
        }
    },

    typography: {
        fontSize: 16, // Set your desired font size here
    },
});

const centerTextStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};


export default function GodBidoof() {

    return (
        <ThemeProvider theme={theme}>
        <div style={centerTextStyles}>
            <Typography variant='h4' color='primary'>
                Pokemon Scarlet Team Builder
            </Typography>
            <img
                alt='God Bidoof'
                src={process.env.PUBLIC_URL + '/images/godBidoof.jpg'}
                className='image-header'
            />
        </div>
        </ThemeProvider>
    )
}