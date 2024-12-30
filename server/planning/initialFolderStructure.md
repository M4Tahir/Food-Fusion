

```markdown
# Project Folder Structure

```
```bash
project-name/
├── controllers/
│   ├── userController.js       # Handles HTTP requests for user operations, calls userService methods
│   └── recipeController.js     # Handles HTTP requests for recipe operations, calls recipeService methods
├── services/
│   ├── userService.js          # Contains business logic for user-related operations like creating and updating users
│   ├── recipeService.js        # Contains business logic for recipe-related operations like adding, updating, and deleting recipes
│   └── emailService.js         # Contains logic for sending emails (e.g., welcome emails, password resets)
├── routes/
│   ├── userRoutes.js           # Defines routes for user-related endpoints (e.g., POST /users)
│   └── recipeRoutes.js         # Defines routes for recipe-related endpoints (e.g., GET /recipes)
├── models/
│   ├── userModel.js            # Defines the User model and schema for interacting with the database
│   └── recipeModel.js          # Defines the Recipe model and schema for interacting with the database
├── utils/
│   ├── appError.js             # Custom error handling class for throwing and managing errors in the app
│   ├── validateInput.js        # Contains validation functions for user input or data (e.g., user email format)
│   └── logger.js               # Utility for logging application errors or important events
├── config/
│   ├── dbConfig.js             # Contains configuration settings for connecting to the database
│   └── serverConfig.js         # Contains configuration settings for the server (e.g., port number)
├── app.js                      # Main application entry point, sets up Express, middleware, routes, etc.
├── server.js                   # Starts the server and listens on the specified port
└── package.json                # Contains metadata about the app, dependencies, scripts, etc.
```

### Explanation:

- **`controllers/`**:
    - Contains files responsible for handling incoming HTTP requests, interacting with the service layer, and sending responses back to the client.
    - **Example:** `userController.js` defines the functions to handle user-related routes like `POST /users`, and it calls the `userService` for the actual business logic.

- **`services/`**:
    - Contains the **business logic** of the application. The services interact with models (database) and other parts of the system to execute operations like creating, reading, updating, and deleting records.
    - **Example:** `userService.js` contains the logic for creating a new user, encrypting passwords, etc. It is called by the `userController`.

- **`routes/`**:
    - Defines the routing logic, mapping URL endpoints to controller functions.
    - **Example:** `userRoutes.js` defines routes like `/users` and links them to the relevant controller functions (`userController`).

- **`models/`**:
    - Defines the **database models** using an ORM (like Mongoose for MongoDB or Sequelize for SQL databases).
    - **Example:** `userModel.js` defines the schema for user data, like name, email, and password, and provides methods to interact with the database.

- **`utils/`**:
    - Contains utility functions or classes used across the application.
    - **Example:** `appError.js` is a custom error class for throwing application-specific errors that can be caught by error-handling middleware.

- **`config/`**:
    - Contains configuration files for connecting to external services, databases, or managing environment variables.
    - **Example:** `dbConfig.js` contains the configuration for connecting to the database, while `serverConfig.js` contains the server setup, like the port number.

- **`app.js`**:
    - Main application file, where you set up the **Express server**, middleware (like body parsers, CORS), and import routes.
    - Example: `app.js` can initialize middleware, logging, error handling, and import the routing modules (`userRoutes`, `recipeRoutes`).

- **`server.js`**:
    - The entry point for running the application. It will import the `app.js` file and start the server by listening on a specified port.
    - Example: `server.js` might look like `app.listen(3000)` to run the app on port 3000.

- **`package.json`**:
    - Contains metadata about the project, such as its dependencies, scripts for starting the server, and other package information.

---

### Example Code Snippets:

#### `controllers/userController.js`:

```javascript
const userService = require('../services/userService');
const AppError = require('../utils/appError');

const createUserController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await userService.createUser({ name, email, password });
        res.status(201).json({
            status: 'success',
            data: { user: newUser }
        });
    } catch (error) {
        next(error); // Pass error to error-handling middleware
    }
};

module.exports = { createUserController };
```

#### `services/userService.js`:

```javascript
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const createUser = async (userData) => {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
    const newUser = await User.create(userData);
    return newUser;
};

module.exports = { createUser };
```

#### `routes/userRoutes.js`:

```javascript
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/users', userController.createUserController);

module.exports = router;
```

#### `models/userModel.js` (using Mongoose as an example):

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```

#### `app.js`:

```javascript
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

app.use('/api', userRoutes); // Register the user routes

module.exports = app;
```

#### `server.js`:

```javascript
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```

---

This structure ensures that your app follows best practices by separating concerns, making it more maintainable, scalable, and testable.