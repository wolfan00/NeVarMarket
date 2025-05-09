import express, { json, urlencoded } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mainRoutes from './routes/mainRoutes.js';
import { adminJs, adminRouter } from './admin.js';
import {sequelize} from './models/index.js'; 

// Configuring dotenv
dotenv.config();

const app = express();
app.use(adminJs.options.rootPath, adminRouter);
const port = 3000;

app.use(cookieParser()); //cookie okumak için gerekli!
app.use(json()); // JSON verisini okumak için gerekli!
app.use(urlencoded({ extended: true })); // Form verisi için gerekli!
app.use('/', mainRoutes); // routes all Main routes

app.listen(port, () => {
  console.log(`AdminJS: http://localhost:${port}${adminJs.options.rootPath}`); //admin paneli girişi
  console.log(`Server is running on http://localhost:${port}/`); //server girişi
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
