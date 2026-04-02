import jwt from "jsonwebtoken";

export const generateWebTokens = async (userId: number, role: string) => {
  return jwt.sign({ userId, role }, process.env.JWT_TOKEN!, {
    expiresIn: "1d",
  });
};
