import 'next-auth';
import { DefaultSession, DefaultJWT } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    permissions: string[];
  }

  interface Session extends DefaultSession {
    user: User & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT, User {
    id: string;
    email: string;
    name: string;
    permissions: string[];
  }
}
