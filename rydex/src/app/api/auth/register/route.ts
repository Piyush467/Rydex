import connectDB from "@/lib/db";
import { sendMail } from "@/lib/sendMail";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();
        await connectDB();
        let user = await User.findOne({ email });
        if (user && user.isEmailVerified) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        if (password.length < 6) {
            return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        if (user && !user.isEmailVerified) {
            user.name = name;
            user.password = hashedPassword;
            user.email = email;
            user.otp = otp;
            user.otpExpiry = otpExpiresAt;
            await user.save();
            return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });
        }
        else {
            user = await User.create({
                name, email, password: hashedPassword, otp, otpExpiry: otpExpiresAt
            });
        }

        await sendMail(
            email,
            "Your OTP for Email Verificaion",
            `<h2>Your Email Verification OTP is <strong>${otp}</strong></h2><p>This OTP will expire in 10 minutes</p>`
        )

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}