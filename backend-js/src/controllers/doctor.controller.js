import { Appointment } from "../models/appointment.model.js"
import { Doctor } from "../models/doctor.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const doctorRegisteration = async(req, res)=>{
    try {

        console.log(req.body)

        const { firstName, lastName, email, password, speciality, gender, dob, phoneNumber, clinicAddress, pinCode, state, country, educationHistory, workExperience, rating } = req.body

        const workExperienceArray = workExperience.split("\n")

        if(
            [firstName, lastName, email, speciality].some( (field) => 
            field?.trim() === ""
            )
        ){
            return res.status(400).json({
                message: "All fields are required!"
            })
        }

        const existedDoctor = await Doctor.findOne({email: email})

        if(existedDoctor){
            return res.status(401).json({
                message: "User already exist!!"
            })
        }

        

        const doctor = await Doctor.create({
            firstName,
            lastName,
            email,
            password,
            speciality,
            gender,
            dob,
            phoneNumber, 
            clinicAddress, 
            pinCode, 
            state, 
            country, 
            educationHistory,
            workExperience: workExperienceArray, 
            rating
        })

        return res.status(200).json({
            doctor
        })

    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

const imageUpload = async(req, res)=>{
    try {
        
        console.log('***********',req.file);
        const email = req.query.email;
        console.log('email',email)

        const avatarLocalPath = req.file?.path 

        if(!avatarLocalPath){
            return res.status(400).json({
                message: "avatar file required"
            })
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath)

        console.log(avatar?.url)

        if(!avatar){
            return res.status(400).json({
                message: "avatar not uploaded successfully"
            })
        }

        const updatedDoctor = await Doctor.findOneAndUpdate(
            { email },
            { $set: { avatar: avatar?.url } },
            { new: true } // Return the updated document
          );

        return res.status(201).json({
            success: true,
            updatedDoctor
        })  

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const findDoctor = async(req, res)=>{
    try {
        
        const {specialist} = req.body

        const Specialist = specialist.split(".")[0].trim()

        if(!Specialist){
            return res.status(401).json({
                message: "Specialist not found!!"
            })
        }

        console.log(Specialist)

        const matchedSpecialityDoctor = await Doctor.find({speciality: Specialist})

        if(!matchedSpecialityDoctor){
            return res.status(400).json({
                message: "Not found doctor"
            })
        }

        return res.status(200).json({
            matchedSpecialityDoctor,
        })



    } catch (error) {
        return res.status(500).json({
            error:error?.message
        })
    }
}

const getDoctorDetail = async(req, res)=>{
    try {

        const id = req.query.id

        const doctor = await Doctor.findById(id)

        if(!doctor){
            return res.status(400).json({
                message: "Something issue in fetching doctor"
            })
        }

        return res.status(200).json({
            doctor
        })
        
    } catch (error) {
       return res.status(500).json({
        error: error.message
       }) 
    }
}

const doctorLogin = async (req, res)=>{
    try {
        const {email, password} = req.body

        console.log(email, password)
    
        if(!email && !password){
            return res.status(400).json({
                message: "Email and Password required!!"
            })
        }

        const doctor = await Doctor.findOne({email: email})

        console.log(doctor)

        if(!doctor){
            return res.status(400).json({
                message: "User not exist!!"
            })
        }

        const isPasswordCorrect = await doctor.isPasswordCorrect(password)

        if(!isPasswordCorrect){
            return res.status(400).json({
                message: "Password not matched!!"
            })
        }

        const doctorToken = doctor.generateToken()

        console.log(doctorToken)

        const options = {
            httpOnly: true,
            sameSite: 'None',
            secure: true
        }

        return res
        .status(200)
        .cookie("doctorToken", doctorToken, options)
        .json({
            doctor,
            doctorToken
        })


    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

const getAllApointment = async (req, res)=>{
    try {

        const doctor_id = req.doctor.id

        const instances = await Appointment
                                .find({})
                                .populate({
                                    path: "user",
                                    select: "-password"
                                })
                                .populate({
                                    path: "doctor",
                                    select: "-password"
                                })

        if(!instances){
            return res.status(401).json({
                message: "NO appointment!!"
            })
        }

        const filteredData = instances.filter(instance => instance.doctor._id.toString() === doctor_id)

        return res.status(200).json({
            filteredData
        })

        return 
        
    } catch (error) {
        console.log("error: ", error)
        return res.status(500).json({
            error
        })
    }
}

const getDoctorList = async (req, res)=>{
    try {
        console.log("doctor**********")
        const doctor = await Doctor.find({}).select("-password")

        if(!doctor){
            return res.status(400).json({
                message: "Error in fetching doctor!!"
            })
        }
        return res.status(200).json({
            doctor
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

export {
    doctorRegisteration,
    findDoctor,
    getDoctorDetail,
    doctorLogin,
    imageUpload,
    getAllApointment,
    getDoctorList
}