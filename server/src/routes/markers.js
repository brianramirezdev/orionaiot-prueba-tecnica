import { Router } from "express";
import { createMarker, deleteMarker, listMarkers, updateMarker } from "../data/markers.js";

export const markersRouter = Router();

function validateMarkerPayload(body) {
  const { description, lat, lng } = body;
  const latitude = Number(lat);
  const longitude = Number(lng);

  if (!description || typeof description !== "string") {
    return "La descripción es obligatoria.";
  }
  if (Number.isNaN(latitude) || latitude < -90 || latitude > 90) {
    return "La latitud debe ser un número entre -90 y 90.";
  }
  if (Number.isNaN(longitude) || longitude < -180 || longitude > 180) {
    return "La longitud debe ser un número entre -180 y 180.";
  }
  return null;
}

markersRouter.get("/", (req, res) => {
  res.json(listMarkers());
});

markersRouter.post("/", (req, res) => {
  const error = validateMarkerPayload(req.body);
  if (error) return res.status(400).json({ message: error });

  const { description, lat, lng } = req.body;
  const marker = createMarker({ description, lat: Number(lat), lng: Number(lng) });
  res.status(201).json(marker);
});

markersRouter.put("/:id", (req, res) => {
  const error = validateMarkerPayload(req.body);
  if (error) return res.status(400).json({ message: error });

  const { description, lat, lng } = req.body;
  const marker = updateMarker(req.params.id, { description, lat: Number(lat), lng: Number(lng) });

  if (!marker) return res.status(404).json({ message: "Marcador no encontrado." });
  res.json(marker);
});

markersRouter.delete("/:id", (req, res) => {
  const deleted = deleteMarker(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Marcador no encontrado." });
  res.status(204).send();
});
