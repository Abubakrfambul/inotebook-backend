const connectMongoDb = require('./db');
const express = require('express');
const app  = express();
const port = 3000;
connectMongoDb();

app.get('/', (req, res) => {
    res.send('hi')
})

app.listen(port, () => {
    console.log(`server is running at port http://localhost:${port}`);
})


