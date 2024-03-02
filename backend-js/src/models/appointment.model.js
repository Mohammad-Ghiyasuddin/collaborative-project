import mongoose, {Schema} from "mongoose"

const appointmentSchema = new Schema({
    appointment: [
        {
            appointmentDate: {
            type: String,
            required: true
        },
        appointmentTime: {
            type: String,
            required: true
        }
    }
    ],
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true
    },
    gender: {
        type:String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pinCode: {
        type: Number,
        required: true
    },
    healthIssue: {
        type: String,
        required: true
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

export const Appointment = mongoose.model("Appointment", appointmentSchema)