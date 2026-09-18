import { Router } from "express";
import { getMonthlySales } from "../data/stats.js";

export const statsRouter = Router();

statsRouter.get("/sales", (req, res) => {
  res.json(getMonthlySales());
});
