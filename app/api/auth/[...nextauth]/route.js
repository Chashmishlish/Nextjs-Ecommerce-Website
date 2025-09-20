import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/databaseConnection";
import UserModel from "@/models/user.model";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await UserModel.findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || null,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // First time JWT callback
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/api/auth/error",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };



// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { connectDB } from "@/lib/databaseConnection";
// import UserModel from "@/models/user.model";
// import bcrypt from "bcryptjs";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       try {
//         await connectDB();

//         // check if user exists
//         let existingUser = await UserModel.findOne({ email: user.email });

//         if (!existingUser) {
//           // create new user in DB
//           existingUser = await UserModel.create({
//             name: user.name,
//             email: user.email,
//             image: user.image,
//             password: await bcrypt.hash(
//               Math.random().toString(36).slice(-8),
//               10
//             ), // random password
//             isEmailVerified: true,
//             provider: account.provider,
//           });
//         }

//         return true; // allow sign in
//       } catch (err) {
//         console.error("Google signIn error:", err);
//         return false; // block sign in on error
//       }
//     },

//     async jwt({ token, user }) {
//       // attach user id to token
//       if (user) token.id = user.id || user._id;
//       return token;
//     },

//     async session({ session, token }) {
//       // attach user id to session
//       session.user.id = token.id;
//       return session;
//     },
//   },
//   pages: {
//     error: "/auth/error", // custom error page
//     signIn: "/auth/register", // your register page
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
