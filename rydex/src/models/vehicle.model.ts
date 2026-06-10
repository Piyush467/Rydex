import mongoose from "mongoose";

export type vehicleTypes =
    "bike" |
    "car" |
    "bus" |
    "truck" |
    "van" |
    "motorcycle" |
    "other"

export interface IVehicle {
    owner: mongoose.Types.ObjectId
    type: vehicleTypes,
    vehicleModel: string,
    numberPlate: string,
    imageUrl?: string,
    baseFare?: number,
    pricePerKM?: number,
    waitingCharge?: number,
    status: "approved" | "pending" | "rejected",
    rejectionReason?: string
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date
}

const vehicleSchema = new mongoose.Schema<IVehicle>({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["bike", "car", "bus", "truck", "van", "motorcycle", "other"], required: true },
    vehicleModel: { type: String, required: true },
    numberPlate: { type: String, required: true, unique: true },
    imageUrl: { type: String },
    baseFare: { type: Number },
    pricePerKM: { type: Number },
    waitingCharge: { type: Number },
    status: { type: String, enum: ["approved", "pending", "rejected"], default: "pending" },
    rejectionReason: { type: String },
    isActive: { type: Boolean, default: true }



}, { timestamps: true })

const vehicle = mongoose.models.Vehicle || mongoose.model<IVehicle>("Vehicle", vehicleSchema)

export default vehicle