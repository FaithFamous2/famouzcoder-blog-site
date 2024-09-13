// import jwt from "jsonwebtoken";
// import {errorHandler} from './error.js';
// export const verifyToken = (req, res, next) => {
//     const token = req.cookies.access_token;
//     if(!token){
//         return next(errorHandler(401, 'Unauthorized'));

//     }
//     jwt.verify(token, process.env.JWT_SECRET,(err, user) => {
//         if(err){
//             return next(errorHandler(401, 'Unauthorized'));
//         }
//         req.user = user;
//         next();
//     });
// };
import jwt from "jsonwebtoken";
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    // Check if token is present
    if (!token) {
        return next(errorHandler(401, 'Unauthorized: No token provided'));
    }

    // Verify the JWT token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // Handle errors related to token verification
            if (err.name === 'TokenExpiredError') {
                return next(errorHandler(401, 'Unauthorized: Token has expired'));
            } else if (err.name === 'JsonWebTokenError') {
                return next(errorHandler(401, 'Unauthorized: Invalid token'));
            } else {
                return next(errorHandler(401, 'Unauthorized: Could not verify token'));
            }
        }

        // Attach decoded user information to the request object
        req.user = decoded;  // Make sure 'decoded' contains the user object or userId
        // console.log('Decoded Token:', decoded);

        next();
    });
};
