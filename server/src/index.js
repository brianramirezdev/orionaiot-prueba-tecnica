import { config } from "./config/env.js";
import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.js";
import { markersRouter } from "./routes/markers.js";
import { statsRouter } from "./routes/stats.js";
import { requireAuth } from "./middleware/auth.js";

const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok", env: config.env }));

app.use("/api/auth", authRouter);
app.use("/api/markers", requireAuth, markersRouter);
app.use("/api/stats", requireAuth, statsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada." });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Error interno del servidor." });
});

app.listen(config.port, () => {
  console.log(`API escuchando en http://localhost:${config.port} [${config.env}]`);
});
