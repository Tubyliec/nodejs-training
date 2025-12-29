import jwt from "jsonwebtoken";

export const generateToken = (userID, userRoles) => {
  const payload = {
    userID,
    userRoles,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};