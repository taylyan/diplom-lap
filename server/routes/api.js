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

module.exports = router;