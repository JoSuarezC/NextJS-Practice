import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { openConnection } from '../../../helpers/db';
import { verifyPassword } from '../../../helpers/auth';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await openConnection();
        const usersCollection = client.db().collection('users');
        const existingUser = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!existingUser) {
          client.close();
          throw new Error('No user found');
        }

        const isValid = await verifyPassword(
          credentials.password,
          existingUser.password
        );

        if (!isValid) {
          client.close();
          throw new Error('Incorrect email or password');
        }

        client.close();
        
        return {
          email: existingUser.email,
        };
      },
    }),
  ],
});