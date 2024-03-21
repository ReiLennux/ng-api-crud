import  express from "express";
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';

const app = express();



app.use(cors());

app.use(express.json())

app.use('/usuarios', userRoutes)
app.use('/auth', authRoutes)

export default app