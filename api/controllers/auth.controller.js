import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async(req, res, next) =>{
    const {username, email, password} = req.body;

    if (!username || !email || !password || username === '' || email=== '' || password===''){
        next(errorHandler(400, 'All fields are required'))
        // return res.status(400).json({message: "All fields are required"});
    };

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json({message: "User saved successfully"});
    } catch (error) {
        next(error);

    }
};

export const signin = async (req, res, next) => {
    const {email, password} =req.body;

    if (!email || !password || email === '' || password === ''){
        return next(errorHandler(400, 'All fields are required'));
    }
    try {
        const ValidUser = await User.findOne({email: email});
        if(!ValidUser){
            return next(errorHandler(400, 'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, ValidUser.password);
        if(!validPassword){
           return next(errorHandler(400, 'Wrong Credentials'));
        }
        const token = jwt.sign({ userId: ValidUser._id },process.env.JWT_SECRET);
        const {password: pass, ...rest} = ValidUser._doc;
        res.status(200).cookie('access_token',token,{
            httpOnly:true,
        }).json(rest);


    } catch (error) {
        next(error)
    }
}
