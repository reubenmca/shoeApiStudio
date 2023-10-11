// Import the Express module
import express from 'express';

// Import the index routes module
import indexRoutes from './routes/index.js';
import personRoutes from './routes/person.js';
import footRoutes from './routes/person.js';
import shoePersonRoutes from './routes/shoePerson.js';
import shoeRoutes from './routes/shoe.js';

import cors from 'cors';

// Create an Express application
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Use the routes module
app.use('/api', indexRoutes);
app.use("/api/persons", personRoutes);
app.use("/api/foots", footRoutes);
app.use("/api/shoePersons", shoePersonRoutes);
app.use("/api/shoes", shoeRoutes);

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});

// Export the Express application. Other modules may use it. For example, API testing
export default app;