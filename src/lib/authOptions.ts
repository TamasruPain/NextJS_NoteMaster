// lib/authOptions.ts

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import UserModel from "@/models/user";
import connectDB from "@/lib/mongodb";
import AdminModel from "@/models/adminModel";
import type { Document, Types } from 'mongoose';

interface BaseUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: string;
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                await connectDB();

                // Try to find user in User collection
                let user: BaseUser | null = await UserModel.findOne({ email: credentials.email });
                let isAdmin = false;

                if (!user) {
                    // If not found, try Admin collection
                    user = await AdminModel.findOne({ email: credentials.email }) as BaseUser;
                    isAdmin = !!user;
                }

                if (!user) {
                    throw new Error("User not found");
                }

                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordCorrect) {
                    throw new Error("Invalid credentials");
                }

                // Return type matches the User interface from next-auth
                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    role: isAdmin ? "admin" : user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: "/sign-in",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
