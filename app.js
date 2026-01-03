const express = require("express");
const cors = require("cors");
const app = express();
const helmet = require('helmet');
const bodyParser = require("body-parser");
config = require('config')
const authMiddleware = require("./middleware/auth.middleware");
const responseMiddleware = require("./middleware/response.middleware");
const globalErrorHandler = require('./middleware/globalErrorHandler');
const loggerMiddleware = require('./middleware/logger.middleware')
require('./config/database/connection')(app);

// Use helmet middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//App middleware
app.use(responseMiddleware());
app.use(authMiddleware());
app.use(loggerMiddleware());

// Routes
const mainRouter = express.Router();
const mainRoutes = require('./routes/index')(mainRouter);
app.use('/app', mainRoutes);

// Global Error Handler
app.use(globalErrorHandler());

app.listen(config.get('PORT'), () => {
  console.log('<------------------Server Running------------------------->')
  console.log(`🚀 Server running on http://localhost:${config.get('PORT')}`);
  console.log('<-------------------------------------------------------->')
});
