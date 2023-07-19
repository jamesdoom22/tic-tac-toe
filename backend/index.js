import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import apiRoutes from './apiRoutes.js';
import path from 'path';
const __dirname = path.resolve();
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "views")));
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


// Middleware function to check if request is from whitelisted IP
const whitelistIPs = ['::1', '::ffff:127.0.0.1', '192.168.0.125']
const whitelistMiddleware = (req, res, next) => {
    const clientIP = req.ip;
    const clientWebsite = req.hostname;
    console.log(`"🚀 ~ whitelistMiddleware ~ clientIP: ${clientIP} clientWebsite: ${clientWebsite}`)

    if (whitelistIPs.includes(clientIP)) {
        console.log("Whitelisted");
        next();
    } else {
        console.log("Not Whitelisted");
        res.sendFile(path.join(__dirname, "views", "not-allowed.html"));
    }
};
app.use('/api', apiRoutes);

app.get('/test', (req, res) => { res.json({ succes: true, message: 'Testing' }) })

const CONNECTION_URL = process.env.MONGO_DB || 'mongodb+srv://looksfam:1hyzncXXuSEM4gda@serverlessinstance0.nxgu2.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // autoIndex: true,
    dbName: 'TTT_DB',
}).then(() => app.listen(PORT,() => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))