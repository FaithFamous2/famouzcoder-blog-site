import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js"; // Ensure the User model is imported

export const test =(req, res) => {
    res.json({message: "API is working"});
};
export const updateUser = async(req, res, next) => {
    console.log("Decoded User ID:", req.user.userId);
    console.log("Request User ID:", req.params.userId);

    // console.log(req.user);
    if (req.user.userId !== req.params.userId){
        return next(errorHandler(403, 'You are not allowed to update this user'));
    }
    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler(400,'Password must be at least 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);

    }
    if (req.body.username){
        if (req.body.username.length < 7 || req.body.username.length > 20){
            return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
        }
        if (req.body.username.includes(' ')){
            return next(errorHandler(400, 'Username cannot contain space'));
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandler(400, 'Username must be lowercase'));
        }
        if (!req.body.username.match(/^[a-z0-9]+$/)) { // Ensure all characters are lowercase letters or numbers
            return next(errorHandler(400, 'Username can only contain lowercase letters and numbers'));
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.userId, {
                $set: {
                username:req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password
                },

            },
        {new: true});
        const {password, ...rest} = updateUser._doc;
        res.status(200).json(rest);

        } catch (error) {
            next(error)
        }
    }
};
