const express = require('express');
require('express-async-errors');
const app = express();
const connectDB = require('./db/connect');
require('dotenv').config()
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
//routes
const authRouter = require('./routes/auth');
const taskRouter = require('./routes/tasks');

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`server listening on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start()