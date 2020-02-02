require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const errorHandler = require('./error-handler');
const userRouter = require('./components/user-router');
const guideRouter = require('./components/guide-router');
const bookingRouter = require('./components/booking-router');
const tourRouter = require('./components/tour-router');
const authRouter = require('./components/auth-router');
const searchRouter = require('./components/search-router');

const app = express();

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))

app.use(helmet());
app.use(cors());

app.use('/api/users', userRouter)
app.use('/api/guides', guideRouter)
app.use('/api/bookings', bookingRouter)
app.use('/api/tours', tourRouter)
app.use('/api/search', searchRouter)
app.use('/api/auth', authRouter)

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(errorHandler)


module.exports = app;
