// app.js 

import express from 'express';
import accountsRouter from './routes/accounts.js';

const app = express(); 
app.use(express.json()); // Para que las peticiones sean en formato JSON
app.use(accountsRouter);

export default app;