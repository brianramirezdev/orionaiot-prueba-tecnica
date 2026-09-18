import { useEffect, useState, type FormEvent } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import type { Marker } from "@/api/types";
import type { MarkerInput } from "@/api/markers";

type Props = {
  open: boolean;
  /** Marcador a editar, o null para crear uno nuevo. */
  marker: Marker | null;
  onClose: () => void;
  onSubmit: (input: MarkerInput) => Promise<void>;
};

const EMPTY_FORM = { description: "", lat: "", lng: "" };

export function MarkerFormDialog({ open, marker, onClose, onSubmit }: Props) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    setError(null);
    setForm(
      marker
        ? { description: marker.description, lat: String(marker.lat), lng: String(marker.lng) }
        : EMPTY_FORM,
    );
  }, [open, marker]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const lat = Number(form.lat);
    const lng = Number(form.lng);

    if (!form.description.trim()) return setError("La descripción es obligatoria.");
    if (Number.isNaN(lat) || lat < -90 || lat > 90) return setError("Latitud inválida (-90 a 90).");
    if (Number.isNaN(lng) || lng < -180 || lng > 180) return setError("Longitud inválida (-180 a 180).");

    setError(null);
    setIsSubmitting(true);
    try {
      await onSubmit({ description: form.description.trim(), lat, lng });
    } catch {
      setError("No se pudo guardar el marcador. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{marker ? "Modificar marcador" : "Crear marcador"}</DialogTitle>
      <Stack component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Descripción"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            autoFocus
            fullWidth
          />
          <TextField
            label="Latitud"
            value={form.lat}
            onChange={(e) => setForm({ ...form, lat: e.target.value })}
            fullWidth
          />
          <TextField
            label="Longitud"
            value={form.lng}
            onChange={(e) => setForm({ ...form, lng: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Guardar
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
