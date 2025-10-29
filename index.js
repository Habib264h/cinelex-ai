const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const genRoutes = require('./routes/generate');
const { initQueue } = require('./workers/imageWorker');

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/generate', genRoutes);

const PORT = process.env.PORT || 4000;

initQueue();
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
