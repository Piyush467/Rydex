import mongoose, { Document, Mongoose } from "mongoose";

type videoKycStatus = "not_required" | "pending" | "in_progress" | "approved" | "rejected"
export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: "user" | "partner" | "admin";
    isEmailVerified?: boolean;
    partnerOnboardingSteps: number,
    otp?: string;
    mobileNumber?: string;
    partnerStatus: "pending" | "approved" | "rejected";
    rejectionReason: string,
    videoKycStatus: videoKycStatus,
    videoKycRoomId: string,
    videoKycRejectionReason: string
    otpExpiry?: Date;
    createdAt: Date;
    updatedAt: Date;


}

const UserSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "partner", "admin"]
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    partnerOnboardingSteps: {
        type: Number,
        default: 0,
        min: 0
    },
    partnerStatus: {
        type: String,
        default: "pending",
        enum: ["pending", "approved", "rejected"]
    },
    videoKycStatus: {
        type: String,
        default: "not_required",
        enum: ["not_required", "pending", "in_progress", "approved", "rejected"]
    },
    videoKycRoomId: {
        type: String,
        default: ""
    },
    videoKycRejectionReason: {
        type: String,
        default: ""
    },
    rejectionReason: {
        type: String,
        default: ""
    },
    otp: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    otpExpiry: {
        type: Date,
    }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
