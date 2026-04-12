import mongoose, { Document, Mongoose } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: "user" | "partner" | "admin";
    isEmailVerified?: boolean;
    partnerOnBoardingSteps: number,
    otp?: string;
    mobileNumber?:string;
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
    partnerOnBoardingSteps: {
        type: Number,
        min: 0
    },
    otp: {
        type: String,
    },
    mobileNumber:{
        type: String,
    },
    otpExpiry: {
        type: Date,
    }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
