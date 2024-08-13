import jwt, { JwtPayload } from 'jsonwebtoken';

export class JWT {
  static sign(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' });
  }

  static verify(
    token: string,
  ): (Partial<JwtPayload> & { userId?: string }) | undefined {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
      userId?: string;
    };
  }
}
