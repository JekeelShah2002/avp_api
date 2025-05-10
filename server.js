const express = require('express');
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');
const { poolConnect } = require('./db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use('/api', dataRoutes);

poolConnect
    .then(() => console.log('Connected to SQL Server 👌👌'))
    .catch(err => console.error('❌ SQL Server connection error:', err));

app.listen(port, () => {
    console.log(`🏃‍♂️🏇 Server running at http://localhost:${port} 🚀`);
});

