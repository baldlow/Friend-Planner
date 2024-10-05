const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let schedules = []; // In-memory array to hold schedules

// Route to add a user's schedule
app.post('/api/schedule', (req, res) => {
  const { id, availability } = req.body;
  schedules.push({ id, availability });
  res.status(201).send({ message: 'Schedule added successfully!' });
});

// Route to retrieve all schedules
app.get('/api/schedule', (req, res) => {
  res.send(schedules);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

