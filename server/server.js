/*
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;
const bcrypt= require("bcryptjs");
app.use(express.json());
app.use(cors());

//const connectionString = 'mongodb+srv://taylan:Xmafjx9NSc9spAL@proba.spkaebi.mongodb.net/diiplomna?retryWrites=true&w=majority';
const connectionString = 'mongodb+srv://taylan:Xmafjx9NSc9spAL@proba.spkaebi.mongodb.net/diiplomna'        
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

const User = mongoose.model('User');
require("./userDetails")

//'/api/login'

app.post('/register', async (req, res) => {
  const { fname,lname,username,email,password } = req.body;

  const encryptedPassword=await bcrypt.hash(password,10)

  try{
    const oldUser= await User.findOne({ email });

    if(oldUser){
      res.send({error:"User exists"})
    }
    await User.create({
      fname,
      lname,
      username,
      email,
      password: encryptedPassword,
    });
    res.send({status:"ok"})
  }catch (error){
    res.send({status:"error"})
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
*/

const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB Connection
const mongoURI = 'mongodb+srv://taylan:Xmafjx9NSc9spAL@proba.spkaebi.mongodb.net/diiplomna?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// ThingSpeak API Endpoint
const thingSpeakAPI = 'https://api.thingspeak.com/channels/2295351/fields/1/last.json?api_key=7JNHTJGWR1NBR2OX';

// Route to fetch ThingSpeak data
app.get('/api/thingspeak', async (req, res) => {
  try {
    const response = await axios.get(thingSpeakAPI);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching ThingSpeak data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));