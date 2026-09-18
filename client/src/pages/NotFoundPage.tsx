import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { DEFAULT_PATH } from "@/routes/navigation";

export default function NotFoundPage() {
  return (
    <Box sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        404
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        La página que buscas no existe.
      </Typography>
      <Button component={RouterLink} to={DEFAULT_PATH} variant="contained">
        Volver al inicio
      </Button>
    </Box>
  );
}
