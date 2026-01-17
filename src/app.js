const express = require('express');
const client = require('prom-client');

const app = express();
const register = new client.Registry();

// Define a custom metric: Request Counter
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'status']
});
register.registerMetric(httpRequestCounter);

app.get('/', (req, res) => {
  httpRequestCounter.inc({ method: 'GET', status: 200 });
  res.send('Hello, Service is Running.');
});

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(3000, () => console.log('Server running on port 3000'));

