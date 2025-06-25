import jsonwebtoken from "jsonwebtoken";

const generaterJWTTOken = (data: { id: string; institueNumber?: string }) => {
  //@ts-ignore
  const token = jwt.sign(data, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_JWT_EXPIRES_IN,
  });
  return token;
};
export default generaterJWTTOken;
