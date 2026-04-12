import { auth } from "@/auth";
import connectDB from "@/lib/db";
import PartnerBank from "@/models/partnerBank.model";
import User from "@/models/user.model";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const session = await auth()
        if (!session || !session.user?.email) {
            return Response.json({ message: "Unauthorized" }, { status: 400 })
        }

        const user = await User.findOne({ email: session.user.email })
        if (!user) {
            return Response.json({ message: "User not found" }, { status: 400 })
        }

        const { accountHolderName, accountNumber, upi, ifsc, mobileNumber } = await req.json()
        if (!accountHolderName || !accountNumber || !ifsc || !mobileNumber) {
            return Response.json({ message: "Send all bank details" }, { status: 400 })
        }

        const partnerBank = await PartnerBank.findOneAndUpdate(
            { owner: user._id },
            { accountHolderName, accountNumber, ifsc, upi, status: "added" },
            { upsert: true, new: true }
        )

        user.mobileNumber = mobileNumber

        if (user.partnerOnBoardingSteps < 3) {
            user.partnerOnBoardingSteps = 3
        }
        await user.save()

        return Response.json(partnerBank, { status: 200 })

    } catch (error) {
        return Response.json({ message: `partner bank error ${error}` }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectDB()
        const session = await auth()
        if (!session || !session.user?.email) {
            return Response.json({ message: "Unauthorized" }, { status: 400 })
        }

        const user = await User.findOne({ email: session.user.email })
        if (!user) {
            return Response.json({ message: "User not found" }, { status: 400 })
        }

        const partnerBank = await PartnerBank.findOne({ owner: user._id })
        if (partnerBank) {
            return Response.json(partnerBank, { status: 200 })
        } else {
            return Response.json({ message: "Partner bank not found" }, { status: 400 })
        }

    } catch (error) {
        return Response.json({ message: `get partner bank error ${error}` }, { status: 500 })
    }
}
