// import express from 'express';
// import mongoose from 'mongoose';
// import cookieParser from 'cookie-parser';
// import { config } from 'dotenv';
// import { swaggerServe, swaggerSetup } from './swagger.js';
// import usersRouter from './routes/users.router.js';
// import petsRouter from './routes/pets.router.js';
// import adoptionsRouter from './routes/adoption.router.js';
// import sessionsRouter from './routes/sessions.router.js';
// import { logger } from './utils/logger.js';
// import handlebars from 'express-handlebars';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import viewsRouter from './routes/views.router.js';

// config();

// const app = express();
// const PORT = process.env.PORT || 8080;

// const connection = mongoose.connect(process.env.DB_LINK);




// connection
//     .then(() => {
//         console.log('Connected to MongoDB');
//     })
//     .catch((error) => {
//         console.error('Error connecting to MongoDB:', error);
//     });

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.engine('handlebars',handlebars.engine());
// app.set('views',__dirname+'/views');
// app.set('view engine','handlebars');

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());

// app.use('/api/users', usersRouter);
// app.use('/api/pets', petsRouter);
// app.use('/api/adoptions', adoptionsRouter);
// app.use('/api/sessions', sessionsRouter);
// app.use('/api-docs', swaggerServe, swaggerSetup);

// app.use('/',viewsRouter);

// app.listen(PORT, () => logger.info(`Listening on ${PORT}`));

// export default app;

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { swaggerServe, swaggerSetup } from './swagger.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import { logger } from './utils/logger.js';
import handlebars from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import viewsRouter from './routes/views.router.js';


config();

const app = express();
const PORT = process.env.PORT || 8080;

const connection = mongoose.connect(process.env.DB_LINK);

connection
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine('handlebars',handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','handlebars');

app.use('/', viewsRouter);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter); 
app.use('/api-docs', swaggerServe, swaggerSetup);



app.listen(PORT, () => logger.info(`Listening on ${PORT}`));

export default app;