
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import principal from "./routes/principal";

const app = express();
app.use(cors());

app.use(express.json());

const port = process.env.PORT || 3000;

app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));

app.use("/",principal);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});