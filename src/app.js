require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const errorHandler = require('./error-handler');
const userRouter = require('./components/user-router');
const tourRouter = require('./components/tour-router');
const authRouter = require('./components/auth-router');
// const jwt = require('jsonwebtoken');

const app = express();

// const morganOption = NODE_ENV === "production" ? "tiny" : "common";
app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))

// app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/api/users', userRouter)
app.use('/api/tours', tourRouter)
app.use('/api/auth', authRouter)

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(errorHandler)


module.exports = app;
