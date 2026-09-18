// Marcadores de proyectos inmobiliarios, en memoria y compartidos entre todos los usuarios.
const markers = [
  { id: crypto.randomUUID(), description: "Conjunto Reserva del Norte", lat: 4.7284, lng: -74.0453 },
  { id: crypto.randomUUID(), description: "Torres Country Club", lat: 4.6839, lng: -74.0483 },
  { id: crypto.randomUUID(), description: "Edificio Parque Central", lat: 4.6097, lng: -74.0817 },
  { id: crypto.randomUUID(), description: "Conjunto Cerros de la Sabana", lat: 4.6482, lng: -74.1050 },
];

export function listMarkers() {
  return markers;
}

export function createMarker({ description, lat, lng }) {
  const marker = { id: crypto.randomUUID(), description, lat, lng };
  markers.push(marker);
  return marker;
}

export function updateMarker(id, { description, lat, lng }) {
  const marker = markers.find((item) => item.id === id);
  if (!marker) return null;

  marker.description = description;
  marker.lat = lat;
  marker.lng = lng;
  return marker;
}

export function deleteMarker(id) {
  const index = markers.findIndex((item) => item.id === id);
  if (index === -1) return false;

  markers.splice(index, 1);
  return true;
}
