import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#151413',
            light: 'skyblue'
        },
        secondary: {
            main: '#B6A637',
            light: '#F5EBFF',
        },
        otherColor: {
            main: "#999"
        }
    },
    typography: {
        fontSize: 30
    }
});
