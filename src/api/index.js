import express from 'express';
import indexRouter from '../routes/indexRoutes.js';
const app = express();

app.use('/api/v1', indexRouter);
app.use((error, req, res, next) => {
    return res.status(500).json({ error: error.toString() });
});

app.listen(3000, () => console.log("server listening..."));
