import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES_IN,
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
    },
    refreshToken: {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    ignoreExpiration: process.env.NODE_ENV === 'development', // Ignore l'expiration en dev
  };
});
