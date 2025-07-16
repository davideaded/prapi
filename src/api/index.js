import express from 'express';
import indexRouter from '../routes/indexRoutes.js';
const app = express();

app.use(express.json());
app.use('/api/v1', indexRouter);

app.get('/{*any}', function (req, res, next) {
    const error = new Error(
        `${req.ip} tried to access ${req.originalUrl}`,
    );
    error.statusCode = 301;
    next(error);
});

app.use((error, req, res, next) => {
    if (!error.statusCode) error.statusCode = 500;
    if (error.statusCode === 301) {
        return res.status(301).redirect('/not-found');
    }
    return res
        .status(error.statusCode)
        .json({ error: error.toString() });
});

app.listen(3000, () => console.log("server listening..."));
