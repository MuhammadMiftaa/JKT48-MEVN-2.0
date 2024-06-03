import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username cannot blank"],
        unique: [true, "Username not available"]
    },
    email: {
        type: String,
        required: [true, "Email cannot blank"],
        unique: [true, "Email not available"],
        validate: {
            validator: validator.isEmail,
            message: "Format email is wrong"
        }
    },
    password: {
        type: String,
        minLength: 8,
        required: [true, "Password cannot blank"],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user"
    }
})

userSchema.methods.comparePWD = async function(clientPWD){
    return await bcrypt.compare(clientPWD, this.password)
}

userSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema)

export default User