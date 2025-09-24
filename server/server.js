import express from 'express';
import cors  from "cors";
import {neon} from '@neondatabase/serverless'; 

import { clerkMiddleware , clerkClient, requireAuth, getAuth} from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import {connectCloudinary} from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

await connectCloudinary()

// Middleware
app.use(express.json());

app.use(clerkMiddleware())

//cors
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  methods: "GET,POST,PUT,DELETE",  // allowed methods
  credentials: true                // if you’re using cookies or auth headers
}));

// Routes
app.get('/', (req, res) => {
  res.send('Hello, Express Server is live and  running with ES Modules!');
});

// routes after this only registered user can loggedin user can use and it protects the routes
app.use(requireAuth())

app.use('/api/ai' , aiRouter);

app.use('/api/user',userRouter);



// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
