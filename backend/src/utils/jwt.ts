import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// توکن بساز
export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// توکن رو چک کن
export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { userId: string };
};
