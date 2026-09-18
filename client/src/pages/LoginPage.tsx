import { useState, type FormEvent } from "react";
import { Alert, Box, Button, Link as MuiLink, TextField } from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate, type Location } from "react-router-dom";
import { AuthCard } from "@/components/layout/AuthCard";
import { useAuth } from "@/context/AuthContext";
import { DEFAULT_PATH } from "@/routes/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
      const redirectTo = (location.state as { from?: Location } | null)?.from?.pathname ?? DEFAULT_PATH;
      navigate(redirectTo, { replace: true });
    } catch {
      setError("Correo o contraseña incorrectos.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthCard title="Inicia sesión">
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
          fullWidth
        />
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </Button>
        <MuiLink component={RouterLink} to="/register" variant="body2" sx={{ textAlign: "center" }}>
          ¿No tienes cuenta? Regístrate
        </MuiLink>
      </Box>
    </AuthCard>
  );
}
