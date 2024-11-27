import { User } from '@/models/User';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const providers = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials, req) {
      // Runs first on sign in
      // Returns User object or null

      if (!credentials?.email || !credentials?.password) return null;

      const user = await User.findOne({ email: credentials.email });
      if (!user) return null;

      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (!isValid) return null;

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        permissions: user.permissions,
      };
    },
  }),
];

export const authOptions: NextAuthOptions = {
  providers,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Runs after authorize() and on every token refresh
      // Returns a JWT token or undefined

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.permissions = user.permissions;
      }

      return token;
    },
    async session({ session, token }) {
      // Runs after jwt()
      // Returns a Session object or undefined

      const user = await User.findById(token.id);

      if (user) {
        session.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          permissions: user.permissions,
        };
      } else {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
          permissions: [],
        };
      }

      return session;
    },
  },
};
