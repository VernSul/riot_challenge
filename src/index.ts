import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cryptoEndpoints from './routes/cryptoRoute';
import { errorHandler } from './middleware/errorHandler';
import { validateJsonInput } from './middleware/cryptoMiddleware';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// CORS middleware: allows all origins
app.use(cors());

// Middlewares
app.use(bodyParser.json());
app.use(validateJsonInput);

// Api Routes
app.use(cryptoEndpoints);

// Error handlers
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
