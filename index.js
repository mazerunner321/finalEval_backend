require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { connection } = require('./config/db');
const { userRouter } = require('./routes/userRoutes');
const { postRouter } = require('./routes/postRoutes');
const { authenticate } = require('./middleware/authenticate.middleware');


const app = express();

app.use(express.json());
app.use(cors());

//Users:
app.use('/users', userRouter);

app.use(authenticate);
//posts:
app.use('/posts', postRouter);


app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log('Connected to DB');
    } catch (error) {
        console.log("Error conncecting to DB");
        console.log(error);
    }
    console.log(`Running on port: ${process.env.port}`);
});

