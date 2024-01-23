const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module
const app = express();
const port = 3000;

app.use(bodyParser.json());

const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Add a default route for the root path
app.get('/', (req, res) => {
  // Send the index.html file
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const db = require('./models/db');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
