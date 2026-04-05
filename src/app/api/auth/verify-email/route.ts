import connectDB from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email, otp } = await req.json();

        if (!email && !otp) {
            return Response.json(
                { message: "Email and OTP is required" },
                { status: 400 }
            )
        }

        let user = await User.findOne({ email });
        if (!user) {
            return Response.json(
                { message: "User not found" },
                { status: 404 }
            )
        }

        if (user.isEmailVerified) {
            return Response.json(
                { message: "Email already verified" },
                { status: 400 }
            )
        }

        if (!user.otp || user.otp !== otp) {
            return Response.json(
                { message: "Invalid OTP" },
                { status: 400 }
            )
        }

        if (user.otpExpiry < new Date()) {
            return Response.json(
                { message: "OTP has expired" },
                { status: 400 }
            )
        }

        user.isEmailVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        return Response.json(
            { message: "Email verified successfully" },
            { status: 200 }
        )

    } catch (e) {
        console.log(e);
        return Response.json(
            { message: "Internal server error" },
            { status: 500 });
    }
}