// Almacén en memoria: se reinicia con cada arranque del servidor (no se pide BD en la prueba).
const users = new Map();

export function findUserByEmail(email) {
  return users.get(email.toLowerCase());
}

export function createUser({ name, email, passwordHash }) {
  const normalizedEmail = email.toLowerCase();
  const user = { id: crypto.randomUUID(), name, email: normalizedEmail, passwordHash };
  users.set(normalizedEmail, user);
  return user;
}

export function toPublicUser(user) {
  const { passwordHash, ...publicUser } = user;
  return publicUser;
}
