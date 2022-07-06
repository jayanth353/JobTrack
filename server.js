import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";
const app = express();

//db
import connectDB from "./db/connect.js";

//routes
import authRouter from "./routes/authRoutes.js";
import jobRouter from "./routes/jobsRoutes.js";

//middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import authenticateUser from "./middleware/auth.js";

if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (err) {
        console.log(err);
    }
};

start();
