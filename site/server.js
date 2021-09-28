const next = require('next');
const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();
const server = express();

const options = {
  key: fs.readFileSync('./certificates/private.key'),
  cert: fs.readFileSync('./certificates/certificate.crt'),
};

const ports = {
  http: 80,
  https: 443,
};

app.prepare().then(() => {
  server.use(cors());

  server.all('*', (req, res) => handle(req, res));

  http.createServer(server).listen(ports.http);
  https.createServer(options, server).listen(ports.https);
});
