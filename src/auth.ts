import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDB from "./lib/db";
import User from "./models/user.model";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {
                    type: "email",
                    label: "Email",
                    placeholder: "johndoe@gmail.com",
                },
                password: {
                    type: "password",
                    label: "Password",
                    placeholder: "*****",
                },
            },
            async authorize(credentials, request) {
                if (!credentials?.email || !credentials?.password) {
                    throw Error("Invalid credentials")
                }
                const email = credentials.email;
                const password = credentials.password as string;
                await connectDB();
                const user = await User.findOne({ email });
                if (!user) {
                    throw Error("User not found")
                }
                const isMatched = await bcrypt.compare(password, user.password);
                if (!isMatched) {
                    throw Error("Incorrect password")
                }
                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role,
                }
            },
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        })
    ],
    callbacks: {

        async signIn({ user, account }) {
            if (account?.provider === "google") {
                await connectDB();
                const dbUser = await User.findOne({ email: user.email });
                if (!dbUser) {
                    await User.create({
                        name: user.name,
                        email: user.email,
                    })
                }
                user.id = dbUser._id.toString();
                user.role = dbUser.role;
            }
            return true;
        },

        async jwt({ token, user }) {
            token.name = user.name;
            token.role = user.role;
            token.id = user.id;
            token.email = user.email;
            return token;
        },
        async session({ token, session }) {
            session.user.id = token.id as string;
            session.user.role = token.role as string;
            session.user.email = token.email as string;
            session.user.name = token.name;
            return session;
        }
    },
    pages: {
        signIn: "/signin",
        error: "/signin"
    },
    session: {
        strategy: "jwt",
        maxAge: 10 * 24 * 60 * 60 * 1000,
    },
    secret: process.env.NEXTAUTH_SECRET,
})