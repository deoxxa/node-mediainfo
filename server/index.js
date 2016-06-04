import http from 'http';
import express from 'express';
import cors from 'cors';
import mediainfo from './mediainfo'

var app = express();
app.server = http.createServer(app);
app.use(cors());
app.use('/info', mediainfo());
app.server.listen(process.env.PORT || 8080);

console.log(`Started on port ${app.server.address().port}`);

export default app;
