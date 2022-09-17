const connectMongoDb = require('./db');
const express = require('express');
var cors = require('cors')
const app  = express();
const port = 5000;
connectMongoDb();
app.use(cors());
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


