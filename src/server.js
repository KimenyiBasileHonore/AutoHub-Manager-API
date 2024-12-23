const dotenv = require("dotenv").config();
const express=require("express");
const cors=require("cors");
const userRoute=require("./routes/userRoute")
const dbConnect=require("./database/dbConnect")
const feedbackRoute =require ( "./routes/feedbackRoute");
const announcementRoute =require ("./routes/announcementRouter");
const messageRouter =require ("./routes/messageRouter");
const productRouter = require("./routes/productRouter");
const cartRoutes = require("./routes/cartRoute");
const paymentRouter = require("./routes/paymentRouter");


const app=express();

dbConnect()

app.use(express.json())
app.use(cors({origin:"*"}))
app.use("/api/user",userRoute)
app.use('/api/feedback', feedbackRoute);
app.use('/api/announc', announcementRoute);
app.use("/api/messages", messageRouter);
app.use("/api/prod", productRouter);
app.use('/api/cart', cartRoutes);
app.use(express.static('uploads'));
app.use('/api/payment', paymentRouter);


const port=process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})
