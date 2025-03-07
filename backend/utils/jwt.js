import jwt from "jsonwebtoken";
// Generate JWT Token
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d", // 1 day
  });
};
