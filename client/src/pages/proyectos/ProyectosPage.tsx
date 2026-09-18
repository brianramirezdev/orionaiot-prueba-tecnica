import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Fab, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup } from "@/components/ui/map";
import { createMarker, deleteMarker, getMarkers, updateMarker, type MarkerInput } from "@/api/markers";
import type { Marker } from "@/api/types";
import { MarkerFormDialog } from "./MarkerFormDialog";

// Bogotá D.C., centrado sobre los proyectos de ejemplo cargados en el backend.
const MAP_CENTER: [number, number] = [-74.08, 4.66];

function MarkerPin() {
  return (
    <LocationOnIcon
      sx={{
        color: "error.main",
        fontSize: 40,
        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
      }}
    />
  );
}

export default function ProyectosPage() {
  const [markers, setMarkers] = useState<Marker[] | null>(null);
  const [error, setError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMarker, setEditingMarker] = useState<Marker | null>(null);

  useEffect(() => {
    getMarkers()
      .then(setMarkers)
      .catch(() => setError(true));
  }, []);

  function openCreateDialog() {
    setEditingMarker(null);
    setDialogOpen(true);
  }

  function openEditDialog(marker: Marker) {
    setEditingMarker(marker);
    setDialogOpen(true);
  }

  async function handleSubmit(input: MarkerInput) {
    const saved = editingMarker
      ? await updateMarker(editingMarker.id, input)
      : await createMarker(input);

    setMarkers((current) => {
      const list = current ?? [];
      return editingMarker
        ? list.map((marker) => (marker.id === saved.id ? saved : marker))
        : [...list, saved];
    });
    setDialogOpen(false);
  }

  async function handleDelete() {
    if (!editingMarker) return;
    await deleteMarker(editingMarker.id);
    setMarkers((current) => (current ?? []).filter((marker) => marker.id !== editingMarker.id));
    setDialogOpen(false);
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Proyectos
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Ubicación de los proyectos inmobiliarios. Haz clic en un marcador para modificarlo.
      </Typography>

      {error && <Alert severity="error">No se pudieron cargar los marcadores.</Alert>}

      <Paper sx={{ position: "relative", height: "65vh", overflow: "hidden" }}>
        {!markers && !error && (
          <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}

        {markers && (
          <Map center={MAP_CENTER} zoom={11}>
            <MapControls showZoom showFullscreen />
            {markers.map((marker) => (
              <MapMarker key={marker.id} longitude={marker.lng} latitude={marker.lat} anchor="bottom">
                <MarkerContent>
                  <MarkerPin />
                </MarkerContent>
                <MarkerPopup>
                  <Typography variant="subtitle2">{marker.description}</Typography>
                  <Typography
                    variant="caption"
                    color="primary"
                    sx={{ cursor: "pointer", display: "block", mt: 0.5 }}
                    onClick={() => openEditDialog(marker)}
                  >
                    Modificar
                  </Typography>
                </MarkerPopup>
              </MapMarker>
            ))}
          </Map>
        )}

        <Fab
          color="secondary"
          aria-label="Crear marcador"
          onClick={openCreateDialog}
          sx={{ position: "absolute", bottom: 16, right: 16 }}
        >
          <AddIcon />
        </Fab>
      </Paper>

      <MarkerFormDialog
        open={dialogOpen}
        marker={editingMarker}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        onDelete={editingMarker ? handleDelete : undefined}
      />
    </>
  );
}
