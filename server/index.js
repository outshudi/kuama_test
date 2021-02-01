import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import {getDetails} from './controlers/details.js';

const app = express();
app.use(cors());
app.use(express.json())
dotenv.config();
// const CONNECTION_URL = "mongodb+srv://oudev:oudev123@cluster0.1tzjz.mongodb.net/kuama?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true});
mongoose.connection.once("open", () => {
      console.log('atlas connection established successfully')
})

app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`)
})

app.get('/details',getDetails);
