import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { createUser, findUserByEmail, toPublicUser } from "../data/users.js";

export const authRouter = Router();

function issueToken(user) {
  return jwt.sign({ sub: user.id, email: user.email, name: user.name }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Nombre, correo y contraseña son obligatorios." });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres." });
  }
  if (findUserByEmail(email)) {
    return res.status(409).json({ message: "Ya existe una cuenta con ese correo." });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser({ name, email, passwordHash });

  res.status(201).json({ token: issueToken(user), user: toPublicUser(user) });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = email ? findUserByEmail(email) : null;
  const passwordMatches = user ? await bcrypt.compare(password ?? "", user.passwordHash) : false;

  if (!user || !passwordMatches) {
    return res.status(401).json({ message: "Correo o contraseña incorrectos." });
  }

  res.json({ token: issueToken(user), user: toPublicUser(user) });
});
