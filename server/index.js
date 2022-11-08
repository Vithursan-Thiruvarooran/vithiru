import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';


import userRoutes from './routes/user.js';
import catanRoutes from './routes/catan.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

const app = express();

//Can limit the size which can be helpful for image uploads
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

var corsOptions = {
	origin: ['http://localhost:3000', 'http://ubuntuserver', 'http://vithiru.ddns.net'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));


app.use('/users', userRoutes);
app.use('/catan', catanRoutes);


const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
