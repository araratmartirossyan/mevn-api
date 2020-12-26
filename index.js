require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const { join } = require('path');
const { routes } = require('./src/routes');

// настроим подключение к бд
mongoose.connect(
  `mongodb://${process.env.MONGO_HOST}:$${process.env.MONGO_PORT}/${process.env.DB_NAME}`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

// инициализируем приложение
const app = express();
console.log('hello');
app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(join(__dirname + '/index.html')));

routes.forEach((item) => {
  app.use(`/api/v1/${item}`, require(`./src/routes/${item}`));
});

// объявим наши  роуты
const PORT = process.env.PORT;
http.createServer({}, app).listen(PORT);

console.log(`Server running at ${PORT}`);
