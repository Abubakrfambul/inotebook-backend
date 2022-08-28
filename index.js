const connectMongoDb = require('./db');
const express = require('express');
const app  = express();
const port = 3000;
connectMongoDb();
app.use(express.json())
// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// app.get('/', (req, res) => {
//     res.send('hi')
// })

// app.get('/api/login', (req, res) => {
//     res.send('hi login')
// })

// app.get('/api/signup', (req, res) => {
//     res.send('hi signup')
// })


app.listen(port, () => {
    console.log(`server is running at port http://localhost:${port}`);
})


