import { error } from "console";
import { RequestHandler } from "express";
import { registerSchema } from "../schemas/register-schema";
import { createAddress, createUser, getAddressesFromUserId, logUser } from "../services/user";
import { loginSchema } from "../schemas/login-schema";
import { addAddressSchema } from "../schemas/add-address-schema";

export const register: RequestHandler = async (req, res) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: "dados invalidos" });
    return;
  }

  const { name, email, password } = result.data;

  const user = await createUser(name, email, password);
  if (!user) {
    res.status(400).json({ error: "Erro ao criar usuário" });
    return;
  }

  res.status(201).json({ error: null, user });
};

export const login: RequestHandler = async (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: "dados invalidos" });
    return;
  }
  const { email, password } = result.data;

  const token = await logUser(email, password);
  if (!token) {
    res.status(401).json({ error: "acesso negado" });
    return;
  }

  res.status(200).json({ token });
};

export const addAddress: RequestHandler = async (req, res) => {
  const userId = (req as any).userId;

  if (!userId) {
    res.status(401).json({ error: "não autorizado" });
    return;
  }

  const result = addAddressSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: "dados invalidos" });
    return;
  }
  const address = await createAddress(userId, result.data);
  if (!address) {
    res.status(400).json({ error: "Erro ao criar endereço" });
    return;
  }

  res.status(201).json({ address });
};

export const getAddresses: RequestHandler = async (req, res) => {
  const userId = (req as any).userId;

  if (!userId) {
    res.status(401).json({ error: "não autorizado" });
    return;
  }
  
  const addresses = await getAddressesFromUserId(userId);


  res.json({ error: null, addresses });
  
};

