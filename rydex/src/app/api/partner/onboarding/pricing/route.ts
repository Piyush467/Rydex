import { NextRequest } from "next/server";
import { auth } from "@/auth";
import User from "@/models/user.model";
import connectDb from "@/lib/db";
import Vehicle from "@/models/vehicle.model";
import uploadOnCloudinary from "@/lib/cloudinary";


export async function POST(ree: NextRequest) {
    try {
        await connectDb();
        const session = await auth()
        if (!session || !session.user?.email) {
            return Response.json({ message: "unauthorized" }, { status: 400 })
        }
        const partner = await User.findOne({ email: session.user.email });
        if (!partner) {
            return Response.json({ message: "partner not found" }, { status: 400 })
        }
        const vehicle = await Vehicle.findOne({ owner: partner._id });
        if (!vehicle) {
            return Response.json({ message: "vehicle not found" }, { status: 400 })
        }
        const formData = await ree.formData();
        const image = formData.get("image") as File | null;
        const baseFare = formData.get("baseFare") as string | null;
        const pricePerKM = formData.get("pricePerKM") as string | null;
        const waitingCharges = formData.get("waitingCharge") as string | null;
        let updated = false;


        if (partner.videoKycStatus !== "approved") {
            return Response.json(
                { message: "Complete video KYC first" },
                { status: 400 }
            );
        }

        if (image && image.size > 0) {
            const imageUrl = await uploadOnCloudinary(image);
            vehicle.imageUrl = imageUrl;
            updated = true;
        }
        if (baseFare !== null) {
            vehicle.baseFare = Number(baseFare);
            updated = true;
        }

        if (waitingCharges !== null) {
            vehicle.waitingCharge = Number(waitingCharges);
            updated = true;
        }

        if (pricePerKM !== null) {
            vehicle.pricePerKM = Number(pricePerKM);
            updated = true;
        }
        if (updated == false) {
            return Response.json({ message: "Nothing to update" }, { status: 400 })
        }
        vehicle.status = "pending";
        vehicle.rejectionReason = undefined;
        await vehicle.save();



        if (partner.partnerOnboardingSteps < 5) {
            partner.partnerOnboardingSteps = 5;
        }

        partner.partnerStatus = "pending";
        vehicle.status = "pending";

        await vehicle.save();
        await partner.save();


        return Response.json({ message: "pricing submitted" }, { status: 200 })


    } catch (error) {
        return Response.json({ message: `pricing error ${error}` }, { status: 500 })

    }
}
export async function GET() {
    try {
        await connectDb();
        const session = await auth()
        if (!session || !session.user?.email) {
            return Response.json({ message: "unauthorized" }, { status: 400 })
        }
        const partner = await User.findOne({ email: session.user.email });
        if (!partner) {
            return Response.json({ message: "partner not found" }, { status: 400 })
        }
        const vehicle = await Vehicle.findOne({ owner: partner._id });
        if (!vehicle) {
            return Response.json({ message: "vehicle not found" }, { status: 400 })
        }
        return Response.json(vehicle, { status: 200 })
    } catch (error) {
        return Response.json({ message: `get pricing error ${error}` }, { status: 500 })

    }

}