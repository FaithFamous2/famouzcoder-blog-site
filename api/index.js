import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';



dotenv.config();

mongoose.connect(process.env.MONGODB).then(() => {
    console.log('MongoDb is Connected');
})
.catch((err) =>{
    console.log(err);
})

const app = express();

app.listen(3000, () => {
    console.log('server is running on port 3000!')
});

app.use('/api/user', userRoutes);