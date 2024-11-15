const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();
app.use(cors({ origin: 'https://alert-hazel.vercel.app' })); 
app.use(express.json()); // For parsing JSON data

//incident schema
const incidentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  severity: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

// Create Incident Model
const Incident = mongoose.model('Incident', incidentSchema);

app.post('/submit-incident', async (req, res) => {
  try {
    const incident = new Incident(req.body); // Create a new incident from request body
    await incident.save(); // Save incident to MongoDB
    res.status(200).json({ message: 'Incident reported successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error reporting incident' });
  }
});

app.get('/incidents', async (req, res) => {
  try {
    const incidents = await Incident.find(); // Fetch all incidents from MongoDB
    res.json(incidents); // Send incidents as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving incidents' });
  }
});



// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
