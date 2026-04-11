import mongoose from "mongoose";

type vehicleType = "car" | "bike" | "truck" | "auto" | "loading"

interface IVehicle {
    owner: mongoose.Types.ObjectId,
    type: vehicleType,
    vehicleModel: String,
    number: String,
    imageUrl?:string,
    baseFare?:number,
    pricePerKm?:number,
    waitingCharge?:number,
    status: "approved" | "pending" | "rejected",
    rejectionReason?:string,
    isActive:boolean,
    createdAt:Date,
    updatedAt:Date,
}

const vehicleSchema = new mongoose.Schema<IVehicle>({

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    type:{
        type:String,
        enum:["car","bike","truck","auto","loading"],
        required:true
    },
    vehicleModel:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true,
        unique:true
    },
    imageUrl:{
        type:String,
    },
    baseFare:{
        type:Number,
    },
    pricePerKm:{
        type:Number,
    },
    waitingCharge:{
        type:Number,
    },
    status:{
        type:String,
        enum:["approved","pending","rejected"],
        default:"pending"
    },
    rejectionReason:{
        type:String,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
},{
    timestamps:true
})

const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle",vehicleSchema)

export default Vehicle