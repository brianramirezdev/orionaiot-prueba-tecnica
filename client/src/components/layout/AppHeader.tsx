import { AppBar, Tab, Tabs, Toolbar, Typography, Button } from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import { NAV_SECTIONS } from "@/routes/navigation";
import { useAuth } from "@/context/AuthContext";

export function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const activeSection =
    NAV_SECTIONS.find((section) =>
      section.items.some((item) => location.pathname.startsWith(item.path)),
    ) ?? NAV_SECTIONS[0];

  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar sx={{ gap: 2 }}>
        <HomeWorkIcon />
        <Typography variant="h6" sx={{ flexGrow: 1 }} noWrap>
          Orion Inmobiliaria
        </Typography>
        {user && (
          <Typography variant="body2" sx={{ opacity: 0.85 }} noWrap>
            {user.name}
          </Typography>
        )}
        <Button color="inherit" size="small" startIcon={<LogoutIcon />} onClick={logout}>
          Salir
        </Button>
      </Toolbar>

      {/* Menús principales: Compra / Venta */}
      <Tabs
        value={activeSection.key}
        textColor="inherit"
        indicatorColor="secondary"
        sx={{ bgcolor: "primary.dark" }}
        onChange={(_, key: string) => {
          const section = NAV_SECTIONS.find((item) => item.key === key)!;
          navigate(section.items[0].path);
        }}
      >
        {NAV_SECTIONS.map((section) => (
          <Tab key={section.key} value={section.key} label={section.label} />
        ))}
      </Tabs>

      {/* Submenús de la sección activa */}
      <Tabs
        value={location.pathname}
        textColor="primary"
        indicatorColor="primary"
        sx={{ bgcolor: "background.paper", minHeight: 40 }}
        onChange={(_, path: string) => navigate(path)}
      >
        {activeSection.items.map((item) => (
          <Tab key={item.path} value={item.path} label={item.label} sx={{ minHeight: 40 }} />
        ))}
      </Tabs>
    </AppBar>
  );
}
