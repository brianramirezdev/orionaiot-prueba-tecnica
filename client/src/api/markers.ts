import { apiClient } from "./client";
import type { Marker } from "./types";

export type MarkerInput = {
  description: string;
  lat: number;
  lng: number;
};

export function getMarkers() {
  return apiClient.get<Marker[]>("/markers").then((res) => res.data);
}

export function createMarker(input: MarkerInput) {
  return apiClient.post<Marker>("/markers", input).then((res) => res.data);
}

export function updateMarker(id: string, input: MarkerInput) {
  return apiClient.put<Marker>(`/markers/${id}`, input).then((res) => res.data);
}
