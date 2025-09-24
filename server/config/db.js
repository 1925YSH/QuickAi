import {neon} from '@neondatabase/serverless';
import dotenv from "dotenv";

dotenv.config(); // Load .env variables
//console.log("DATABASE_URL:", process.env.DATABASE_URL); 

const sql = neon(`${process.env.DATABASE_URL}`);

export default sql;