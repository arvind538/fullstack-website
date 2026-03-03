require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const errorMiddleware = require("./middlewares/error-middleware");

const app = express();



app.use(
    cors({
        origin: process.env.FRONTEND_URI,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        withCredentials: true,
    })
);



app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);



app.use(errorMiddleware);


const PORT = process.env.PORT || 4041;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})



