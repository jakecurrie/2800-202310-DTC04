const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const indexRouter = require('./routes/index');

const app = express();

// Enable CORS for cross-origin requests
app.use(cors());

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Routes
app.use('/api', indexRouter);

// Catch-all handler for any requests not caught by other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

