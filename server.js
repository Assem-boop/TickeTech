const express = require('express');

const app = express();

const eventRoutes = require('./routes/events');
app.use('/api/v1/events', eventRoutes);
