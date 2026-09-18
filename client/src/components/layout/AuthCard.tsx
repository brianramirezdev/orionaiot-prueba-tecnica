import { Box, Paper, Typography } from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import type { ReactNode } from "react";

export function AuthCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, color: "primary.main" }}>
          <HomeWorkIcon fontSize="large" />
          <Typography variant="h5" component="h1">
            Orion Inmobiliaria
          </Typography>
        </Box>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          {title}
        </Typography>
        {children}
      </Paper>
    </Box>
  );
}
