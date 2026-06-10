import { auth } from "@/auth";
import User from "@/models/user.model";
import connectDb from "@/lib/db";
import Vehicle from "@/models/vehicle.model";
import { NextRequest } from "next/server";


const VEHICLE_REGEX = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
export async function POST(req: Request) {
    try {
        await connectDb();
        const session = await auth()
        const body = await req.json();   // ✅ yaha
        console.log("BODY:", body);
        if (!session || !session.user?.email) {
            return Response.json({ message: "unauthorized" }, { status: 400 })
        }
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return Response.json({ message: "user not found" }, { status: 400 })
        }

        const { type, number, vehicleModel } = body;
        if (!type || !number || !vehicleModel) {
            return Response.json({ message: "All fields are required" }, { status: 400 })
        }

        const cleanNumber = number.toUpperCase().replace(/\s+/g, '');
        if (!VEHICLE_REGEX.test(cleanNumber)) {
            return Response.json({ message: "Invalid Vehicle Number Format" }, { status: 400 })
        }

        const vehicleNumber = cleanNumber.toUpperCase();



        let vehicle = await Vehicle.findOne({ owner: user._id });

        if (vehicle) {
            vehicle.type = type;
            vehicle.numberPlate = vehicleNumber;
            vehicle.vehicleModel = vehicleModel;
            vehicle.status = "pending";

            await vehicle.save();

            user.partnerOnboardingSteps = 1;
            user.partnerStatus = "pending";
            user.role = "partner";

            await user.save();

            return Response.json(vehicle, { status: 200 });
        }

        const duplicate = await Vehicle.findOne({ numberPlate: vehicleNumber });
        if (duplicate) {
            return Response.json({ message: "vehicle already registered" }, { status: 400 })
        }

        vehicle = await Vehicle.create({
            owner: user._id,
            type,
            numberPlate: vehicleNumber,
            vehicleModel


        })


        user.partnerOnboardingSteps = 1;

        user.role = "partner";
        user.partnerStatus = "pending";
        await user.save();
        return Response.json(vehicle, { status: 201 })
    }
    catch (error) {
        console.log("ERROR:", error);   // 👈 YAHI ADD KARNA HAI
        return Response.json({ message: "vehicle error" }, { status: 500 })
    }
}
export async function GET(req: NextRequest) {

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
        const vehicle = await Vehicle.findOne({ owner: user._id });
        if (vehicle) {
            return Response.json(vehicle, { status: 200 })
        } else {
            return Response.json(
                { message: "vehicle not found" },
                { status: 404 }
            )
        }


    } catch (error) {
        return Response.json({ message: `get vehicle error ${error}` }, { status: 500 })

    }
}