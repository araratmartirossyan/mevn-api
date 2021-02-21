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
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.c0z10.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);
// инициализируем приложение
const app = express();

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
