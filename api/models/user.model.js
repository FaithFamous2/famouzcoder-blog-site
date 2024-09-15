import mongoose from "mongoose";
const userSchema =
new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required:true,
    },
    profilePicture:{
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/020/213/738/original/add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});


const User =mongoose.model('User',userSchema);

export default User;
