import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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

      return null;
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
      // Returns a JWT token

      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      // Runs after jwt()
      // Returns a Session object or undefined

      // TODO: update using database

      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async signIn(params) {
      // Runs on sign in
      // Returns true or false

      return true;
    },
    async redirect({ url, baseUrl }) {
      // Runs after session() on sign in
      // Returns a URL to redirect the user to

      return baseUrl;
    },
  },
};
