const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const api = require('./routes/index')

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);





// GET Route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    });



app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);
