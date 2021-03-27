import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import routeUrls from "./route/route.js";
import cors from "cors";


dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());
app.use("/app", routeUrls);


const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);




