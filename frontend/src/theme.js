// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#F97316"
		},
		secondary: {
			main: "#3B82F6"
		},
		background: {
			default: "#f5f5f5",
			paper: "#fff"
		},
		text: {
			primary: "#000",
			secondary: "#9CA3AF"
		}
	},
	typography: {
		fontFamily: "'Roboto', 'Arial', sans-serif"
	}
});

export default theme;
