export const authConfig = {
  jwt: {
    secret: process.env.AUTH_SECRET,
    expiresIn: 86400
  }
}