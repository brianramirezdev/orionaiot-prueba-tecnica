export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type Marker = {
  id: string;
  description: string;
  lat: number;
  lng: number;
};

export type MonthlySales = {
  month: string;
  year: number;
  unitsSold: number;
  totalSales: number;
};
