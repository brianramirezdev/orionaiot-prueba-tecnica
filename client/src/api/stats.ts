import { apiClient } from "./client";
import type { MonthlySales } from "./types";

export function getMonthlySales() {
  return apiClient.get<MonthlySales[]>("/stats/sales").then((res) => res.data);
}
