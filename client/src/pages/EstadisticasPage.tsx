import { useEffect, useState } from "react";
import {
  Alert,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getMonthlySales } from "@/api/stats";
import type { MonthlySales } from "@/api/types";

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function EstadisticasPage() {
  const [sales, setSales] = useState<MonthlySales[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getMonthlySales()
      .then(setSales)
      .catch(() => setError(true));
  }, []);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Estadísticas de venta
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Total de venta por mes durante el último año.
      </Typography>

      {error && <Alert severity="error">No se pudieron cargar las estadísticas.</Alert>}
      {!sales && !error && <CircularProgress />}

      {sales && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.100" }}>
                <TableCell>
                  <strong>Mes</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Cantidad de inmuebles</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Total de venta</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((row) => (
                <TableRow key={`${row.month}-${row.year}`} hover>
                  <TableCell>
                    {row.month} {row.year}
                  </TableCell>
                  <TableCell align="right">{row.unitsSold}</TableCell>
                  <TableCell align="right">{currencyFormatter.format(row.totalSales)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
