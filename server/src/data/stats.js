const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

// Unidades vendidas por mes; el total de venta se deriva con un precio promedio por unidad.
const UNITS_SOLD = [20, 30, 30, 50, 25, 40, 35, 45, 28, 32, 38, 42];
const AVERAGE_UNIT_PRICE = 2_000_000;

export function getMonthlySales() {
  const today = new Date();

  return UNITS_SOLD.map((units, offsetFromOldest) => {
    // El mes más reciente queda al final del arreglo, replicando "el último año" hacia atrás desde hoy.
    const monthsAgo = UNITS_SOLD.length - 1 - offsetFromOldest;
    const date = new Date(today.getFullYear(), today.getMonth() - monthsAgo, 1);

    return {
      month: MONTH_NAMES[date.getMonth()],
      year: date.getFullYear(),
      unitsSold: units,
      totalSales: units * AVERAGE_UNIT_PRICE,
    };
  });
}
