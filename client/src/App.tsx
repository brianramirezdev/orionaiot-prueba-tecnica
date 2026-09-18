import { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { DEFAULT_PATH } from "@/routes/navigation";

// Cada pantalla vive en su propio chunk: el mapa (MapLibre) y sus dependencias
// solo se descargan si el usuario visita Proyectos.
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const ProyectosPage = lazy(() => import("@/pages/proyectos/ProyectosPage"));
const EstadisticasPage = lazy(() => import("@/pages/EstadisticasPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function PageFallback() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <CircularProgress />
    </Box>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to={DEFAULT_PATH} replace />} />
            <Route path="/compra/proyectos" element={<ProyectosPage />} />
            <Route path="/venta/estadisticas" element={<EstadisticasPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
