import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import taskRouter from './routes/task.route.js';
import cldRouter from './routes/cloudinary.route.js';
import { errorHandler } from './libs/middleware.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
const PORT = process.env.PORT || 3001;

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/image', cldRouter)
app.use('/api/v1/tasks', taskRouter);

app.use('/', (req, res) => {
    res.status(200).json({message: 'Welcome to Task App'})
})

app.use('*', (req, res) => {
    res.status(404).json({message: 'not found'});
});

app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
});