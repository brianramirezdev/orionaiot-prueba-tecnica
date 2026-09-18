// Estructura de menú/submenú del header. Cada sección (Compra, Venta) puede
// crecer con más submódulos sin tocar el componente de header.
export type NavItem = { label: string; path: string };
export type NavSection = { key: string; label: string; items: NavItem[] };

export const NAV_SECTIONS: NavSection[] = [
  {
    key: "compra",
    label: "Compra",
    items: [{ label: "Proyectos", path: "/compra/proyectos" }],
  },
  {
    key: "venta",
    label: "Venta",
    items: [{ label: "Estadísticas", path: "/venta/estadisticas" }],
  },
];

export const DEFAULT_PATH = NAV_SECTIONS[0].items[0].path;
