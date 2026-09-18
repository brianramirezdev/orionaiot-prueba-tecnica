import { apiClient } from "./client";
import type { AuthResponse } from "./types";

export function login(email: string, password: string) {
  return apiClient
    .post<AuthResponse>("/auth/login", { email, password })
    .then((res) => res.data);
}

export function register(name: string, email: string, password: string) {
  return apiClient
    .post<AuthResponse>("/auth/register", { name, email, password })
    .then((res) => res.data);
}
