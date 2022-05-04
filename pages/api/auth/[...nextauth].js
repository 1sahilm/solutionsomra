import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import dbConnect from "../../../utils/DBconnect";
import Admin from "../../../schema/admin";
import { compare } from "bcrypt";


dbConnect();
export default (req, res) => {
  NextAuth(req, res, {
    providers: [
      Providers.Credentials({
        async authorize(credentials) {
          const user = await Admin.findOne({
            username: credentials.username,
          });
          if (!user) {
            throw new Error("No user found with the Username");
          }
          const checkPassword = await compare(
            credentials.password,
            user.password
          );
          if (!checkPassword) {
            throw new Error("Email or Password is incorrect");
          }

          console.log(user);
          let payload = {
            task: user?.task,
            name: user?.name,
            username: user?.username,
            isSuperAdmin: user?.isSuperAdmin,
            id: user?._id,
            
          };
          if (user) {
            return payload;
          }
        },
      }),
    ],
    database: process.env.MONGODB_URI,
    debug: process.env.NODE_ENV !== "development",
    secret: process.env.JWT_SECRET,
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    callbacks: {
      jwt: async (token, user, account, profile, isNewUser) => {
        user && (token.user = user);
        return Promise.resolve(token);
      },
      session: async (session, user, sessionToken) => {
        session.user = user.user;
        return Promise.resolve(session);
      },
    },
    session: {
      jwt: true,
    },
    pages: {
      signin: "/register",
      signout: "/",
      error: "/register",
    },
  });
};
