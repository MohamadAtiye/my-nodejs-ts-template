import jwt from "jsonwebtoken";

export interface TokenPayload {
  id: string;
  username: string;
  userTypeId: number;
}

// Generate an Access token
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
}

// Generate a Refresh token
export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });
}

// Verify a JWT token
export function verifyToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
