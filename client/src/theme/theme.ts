import { createTheme } from "@mui/material/styles";

// Paleta Material Design; el azul primario coincide con la variable --primary
// de src/index.css para que el mapa (mapcn) y el resto de la UI luzcan coherentes.
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1565c0" },
    secondary: { main: "#ff7043" },
    background: { default: "#f4f6f8" },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: ['"Roboto"', '"Helvetica"', '"Arial"', "sans-serif"].join(","),
  },
});
