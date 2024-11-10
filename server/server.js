const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(express.json()); // For parsing JSON data

// Serve the incidents.json file
const incidentFilePath = path.join(__dirname, 'data', 'incidents.json');
app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});
// POST route to submit a new incident
app.post('/submit-incident', (req, res) => {
  const incident = req.body;

  // Read the existing incidents from the file
  fs.readFile(incidentFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error reading incidents file' });
    }

    // Parse the file contents
    const incidents = JSON.parse(data);

    // Add new incident to the incidents array
    incidents.push(incident);

    // Write the updated array back to the file
    fs.writeFile(incidentFilePath, JSON.stringify(incidents, null, 2), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error writing to incidents file' });
      }

      res.status(200).json({ message: 'Incident reported successfully' });
    });
  });
});

// GET route to retrieve all incidents
app.get('/incidents', (req, res) => {
  fs.readFile(incidentFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error reading incidents file' });
    }

    const incidents = JSON.parse(data);
    res.json(incidents);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
