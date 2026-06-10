import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import connectDb from "@/lib/db";
import PartnerDocs from "@/models/partnerDocs.model";
import User from "@/models/user.model";
import Vehicle from "@/models/vehicle.model";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const session = await auth()
        if (!session || !session.user?.email) {
            return Response.json({ message: "unauthorized" }, { status: 400 })
        }
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return Response.json({ message: "user not found" }, { status: 400 })
        }
        const formdata = await req.formData();
        const aadhar = await formdata.get("aadharnumber") as Blob | null;
        const license = await formdata.get("licencenumber") as Blob | null;
        const rc = await formdata.get("rcnumber") as Blob | null;

        if (!aadhar || !license || !rc) {
            return Response.json({ message: "all fields are required" }, { status: 400 })
        }
        const updatePayload: {
            status: string;
            aadharCardUrl?: string;
            licenseUrl?: string;
            rcUrl?: string;
        } = {
            status: "pending"
        };
        if (aadhar) {
            const url = await uploadOnCloudinary(aadhar);
            if (!url) {
                return Response.json({ message: "Aadhar upload failed" }, { status: 500 });
            }
            updatePayload.aadharCardUrl = url;
        }

        if (license) {
            const url = await uploadOnCloudinary(license);
            if (!url) {
                return Response.json({ message: "License upload failed" }, { status: 500 });
            }
            updatePayload.licenseUrl = url;
        }
        if (rc) {
            const url = await uploadOnCloudinary(rc);
            if (!url) {
                return Response.json({ message: "RC upload failed" }, { status: 500 });
            }
            updatePayload.rcUrl = url;
        }
        const partnerDocs = await PartnerDocs.findOneAndUpdate(
            { owner: user._id },
            { $set: updatePayload },
            { upsert: true, new: true }
        )

        user.partnerOnboardingSteps = 2;
        user.partnerStatus = "pending";

        await user.save();
        return Response.json(partnerDocs, { status: 201 })
    } catch (error) {
        return Response.json({ message: `get partnerdocs error ${error}` }, { status: 500 })

    }
}