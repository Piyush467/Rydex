import connectDB from "@/lib/db"
import { auth } from "@/auth"
import User from "@/models/user.model"
import Vehicle from "@/models/vehicle.model";
import { NextRequest } from "next/server";

const VEHICLE_REGEX = /^[A-Z]{2}[0-9]{1,2}[A-Z]{0,2}[0-9]{4}$/;

export async function POST(req: Request) {
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

        const { type, number, vehicleModel } = await req.json()
        if (!type || !number || !vehicleModel) {
            return Response.json({ message: "All fields are required" }, { status: 400 })
        }

        if (!VEHICLE_REGEX.test(number)) {
            return Response.json({ message: "Invalid vehicle number" }, { status: 400 })
        }

        const vehicleNumber = number.toUpperCase()
        const duplicate = await Vehicle.findOne({ number: vehicleNumber })
        if (duplicate) {
            return Response.json({ message: "Vehicle already exist" }, { status: 400 })
        }


        let vehicle = await Vehicle.findOne({ owner: session.user.id })

        if (vehicle) {
            vehicle.type = type
            vehicle.number = vehicleNumber
            vehicle.vehicleModel = vehicleModel
            vehicle.status = "pending"
            await vehicle.save()

            return Response.json(vehicle, { status: 200 })
        }
        vehicle = await Vehicle.create({
            type,
            number: vehicleNumber,
            vehicleModel
        })

        if (user.partnerOnBoardingSteps < 1) {
            user.partnerOnBoardingSteps = 1
        }
        user.role = "partner"
        await user.save()


        return Response.json(vehicle, { status: 201 })




    } catch (error) {
        console.log(error)
        return Response.json({ error: "Failed to upload image" }, { status: 500 })
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

        let vehicle = await Vehicle.findOne({ owner: user._id })

        if (vehicle) {
            return Response.json(vehicle, { status: 200 })
        } else {
            return null
        }

    } catch (e) {

    }
}
