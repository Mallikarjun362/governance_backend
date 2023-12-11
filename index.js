// index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 8000;; // You can change this port if needed

app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb+srv://aryamob44:gajni143@cluster0.phrc2ye.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a schema for proposal details
const proposalDetailsSchema = new mongoose.Schema({
  proposal_id: String,
  proposal_title: String,
  proposal_content: String,
  proposal_porposer: String,
});

// Create a model based on the schema
const ProposalDetail = mongoose.model('ProposalDetail', proposalDetailsSchema);

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Save proposal details to MongoDB
app.post('/save-proposal', async (req, res) => {
  try {
    const { proposal_id, proposal_title, proposal_content } = req.body;
    const proposalDetail = new ProposalDetail({
      proposal_id,
      proposal_title,
      proposal_content,
      proposal_proposer
    });
    await proposalDetail.save();
    res.status(201).json({ message: 'Proposal details saved successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all proposal details from MongoDB
app.get('/get-all-proposals', async (req, res) => {
  try {
    const allProposals = await ProposalDetail.find();
    res.status(200).json(allProposals);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app