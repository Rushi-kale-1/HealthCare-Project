require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { userRouter } = require("./routes/userRouter");
const { docterRouter } = require("./routes/docterRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 3100; // Allow using port from environment variable or fallback to 3100

app.use('/user', userRouter);
app.use('/docter', docterRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
