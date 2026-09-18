import { useState, type FormEvent } from "react";
import { Alert, Box, Button, Link as MuiLink, TextField } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthCard } from "@/components/layout/AuthCard";
import { useAuth } from "@/context/AuthContext";
import { DEFAULT_PATH } from "@/routes/navigation";
import { isAxiosError } from "axios";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await register(name, email, password);
      navigate(DEFAULT_PATH, { replace: true });
    } catch (err) {
      const message = isAxiosError<{ message: string }>(err)
        ? err.response?.data.message
        : undefined;
      setError(message ?? "No se pudo crear la cuenta.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthCard title="Crea tu cuenta">
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
          fullWidth
        />
        <TextField
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Contraseña"
          type="password"
          helperText="Mínimo 6 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
          {isSubmitting ? "Creando cuenta..." : "Registrarme"}
        </Button>
        <MuiLink component={RouterLink} to="/login" variant="body2" sx={{ textAlign: "center" }}>
          ¿Ya tienes cuenta? Inicia sesión
        </MuiLink>
      </Box>
    </AuthCard>
  );
}
