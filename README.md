# Page Manager

## Project Description:

Create a page manager. It will consist of two parts:

- Admin panel. Requirements:
  - Protected by password (any implementation);
  - Located in {site url}/admin
  - List of existing pages with ability to delete page;
  - Create page form:
    - title; - meta description;
    - content (wysiwyg editor);
    - url slug.
- Pages. Requirements:

  - Located in {site url}/{url slug}.

- All fields should be validated before saving to DB;
- Form should remain filled in case of - validation errors;
- Url slug must be unique;
- The app has to run on port from config.

## Development requirements

- Should work on Node v18+ / MySQL or PostgreSQL / HTML5;
- Don’t use backend frameworks (Express.js is allowed);
- You can use 3rd-party mysql libs, validation libs;
- Character encoding is UTF-8 everywhere: SQL, HTML, JS;
- You can use TypeScript;
- Keep your code well structured, see best practices for coding on Node.js
- Create a private repository on bitbucket.org and share it with our account - services@codeit.pro.
- Deploy your project on any free hosting and provide us with a url.

## Technical stack:

- Backend:
  - Programming language - **Javascript**
  - Framework - **Express.js**
  - Database - **MySQL**
- Frontend:
  - Programming language - **Javascript**
  - Library - **React.js**
- **Docker**

## Project Configuration

This project consists of a backend and a frontend with various environment variables for configuration. Below is an explanation of each variable in the `.env` files for both the backend and frontend.

### Backend Environment Configuration

#### Server Configuration

- `APP_PORT` (default: `3000`): The port on which the application will run.
- `API_BASE_PATH` (default: `/api/v1`): The base path for the API endpoints.

#### Client URL

- `CLIENT_URL` (default: `http://localhost:5173`): The URL of the frontend client, used for CORS.

#### Admin Credentials

- `ADMIN_EMAIL`: The email for the admin user. Default is `adminEmail@example.com`.
- `ADMIN_PASSWORD`: The password for the admin user. Default is `adminPassword123`.

#### JWT Configuration

- `JWT_ACCESS_SECRET` (default: `my_jwt_access_secret_key`): The secret key used to sign access tokens.
- `JWT_REFRESH_SECRET` (default: `my_jwt_refresh_secret_key`): The secret key used to sign refresh tokens.
- `ACCESS_TOKEN_AGE_SECONDS` (default: `300`): The lifespan of an access token in seconds.
- `REFRESH_TOKEN_AGE_SECONDS` (default: `3600`): The lifespan of a refresh token in seconds.

#### MySQL Database Configuration

- `MYSQL_ROOT_PASSWORD` (default: `pass`): The password for the MySQL root user.
- `MYSQL_DATABASE` (default: `page_manager`): The name of the MySQL database to be used.
- `MYSQL_HOST` (default: `mysql_page_manager`): The hostname of the MySQL server.
- `MYSQL_PORT` (default: `3306`): The port on which the MySQL server is running.
- `MYSQL_USERNAME` (default: `user`): The username to connect to the MySQL database.
- `MYSQL_PASSWORD` (default: `user`): The password to connect to the MySQL database.

### Frontend Environment Configuration

#### API URL Configuration

- `VITE_BASE_URL`: The base URL for API requests from the frontend. Default is `http://localhost:3002/api/v1`.

#### Editor API Key

- `VITE_EDITOR_API_KEY`: The API key for the text editor integration.

### Admin Credentials (for frontend)

- `VITE_ADMIN_EMAIL`: The admin email for frontend use. Default is `adminEmail@example.com`.
- `VITE_ADMIN_PASSWORD`: The admin password for frontend use. Default is `adminPassword123`.

## Database

Database for **Page Manager** includes next tables:

### 1. admin

The admin table stores information about administrators who manage the system. It includes the following fields:

- `id`: An integer that serves as the primary key. It is auto-incremented and uniquely identifies each admin.
- `email`: A string (maximum length 255) that stores the hashed password of the admin. It cannot be null.
- `password`: A string that stores the admin's password, which is also not null.
- `createdAt`: A timestamp that stores the date and time when the admin record was created. It defaults to the current timestamp.

### 2. refreshToken

The refreshToken table stores refresh tokens associated with admins. It includes the following fields:

- `id`: An integer that serves as the primary key. It is auto-incremented and uniquely identifies each refresh token.
- `token`: A text field that stores the refresh token itself. This field cannot be null.
- `adminId`: An integer that references the id field in the admin table. It establishes a relationship between the refresh token and the corresponding admin. When the admin is deleted, their associated refresh tokens are also deleted (using ON DELETE CASCADE).

### 3. page

The page table stores information about web pages managed in the system. It includes the following fields:

- `id`: An integer that serves as the primary key. It is auto-incremented and uniquely identifies each page.
- `metaDescription`: A string (maximum length 255) that stores the title of the page. This field cannot be null.
- `content`: A text field that stores the main content of the page. This field cannot be null.
- `urlSlug`: A string (maximum length 255) that stores the unique URL-friendly identifier for the page. It must be unique and cannot be null.
- `createdAt`: A timestamp that stores the date and time when the page record was created. It defaults to the current timestamp.
- `updatedAt`: A timestamp that stores the date and time when the page record was last updated. It is automatically updated to the current timestamp whenever the record is modified.

## Initial Database Data

Initial Administrator
Upon the first launch of the system, an initial administrator is created using the credentials defined in the environment variables:

Email: The value from the ADMIN_EMAIL variable.
Password: The value from the ADMIN_PASSWORD variable.
This initial administrator account is used to log in and create additional administrators.

#### The application includes SQL scripts to create and populate the database tables. These scripts are located in the src/sql/scripts directory:

- `src/sql/scripts/createTables.sql`: This file contains the SQL commands to create the necessary tables in the database.
- `src/sql/scripts/fillTables.sql`: This file contains the SQL commands to populate the created tables with initial data.

## Base URL

`http://localhost:3000`

## API Endpoints

### 1. Create New Admin

**Endpoint:**
POST `/api/v1/admin/create`

- Creates a new admin account.

**Request Body:**

```json
{
  "email": "admin@example.com",
  "password": "SecurePassword123"
}
```

**Responses:**

- **201 Created:**

  ```json
  {
    "message": "Admin created successfully",
    "adminId": "<adminId>"
  }
  ```

- **400 Bad Request:**
  ```json
  {
    "error": "That email is already in use",
    "path": "email"
  }
  ```
  ```json
  {
    "error": "<emailValidation>",
    "path": "email"
  }
  ```
  ```json
  {
    "error": "<passwordValidation>",
    "path": "password"
  }
  ```

### 2. Login

**Endpoint:**
POST `api/v1/login`

- Authenticates a admin and returns an access token.

**Request Body:**

```json
{
  "email": "admin@example.com",
  "password": "SecurePassword123"
}
```

**Responses:**

- **200 OK:**
  ```json
  {
    "message": "Admin logged in successfully",
    "accessToken": "<accessToken>"
  }
  ```
- **401 Unauthorized:**

  ```json
  {
    "error": "No such email exists",
    "path": "email"
  }
  ```

  ```json
  {
    "error": "Password is incorrect",
    "path": "password"
  }
  ```

### 3. Logout

**Endpoint:**
GET `/api/v1/admin/logout`

- Logs out the admin and clears the tokens.

**Responses:**

**200 OK:**

```json
{
  "message": "Admin logged out successfully"
}
```

### 4. Refresh Token

**Endpoint:**
GET `api/v1/refresh`

- Generates new access and refresh tokens using the provided refresh token stored in cookies.

**Responses:**

- **200 OK:**

  ```json
  {
    "message": "Tokens refreshed successfully",
    "accessToken": "<accessToken>",
    "adminId": "<adminId>"
  }
  ```

- **401 Unauthorized:**

  ```json
  {
    "error": "No refresh token provided"
  }
  ```

  ```json
  {
    "error": "Refresh token is not valid"
  }
  ```

  ```json
  {
    "error": "Admin with such token is not found"
  }
  ```

### 5. Get All Pages

**Endpoint:**
POST `/api/v1/admin/pages`

- Retrieves all available pages.

**Responses:**

- **200 OK:**

  ```json
  {
    "message": "Pages retrieved successfully",
    "pages": [
      {
        "id": "<pageId>",
        "title": "Example Page Title",
        "urlSlug": "example-page",
        "metaDescription": "A description of the page",
        "content": "Page content goes here"
      }
    ]
  }
  ```

- **401 Unauthorized (Invalid Access Token):**

  ```json
  {
    "error": "Invalid Access Token"
  }
  ```

- **400 Bad Request (Invalid Scores):**

  ```json
  {
    "error": "<scoresValidation>"
  }
  ```

### 6. Get Page by URL Slug

**Endpoint:**
GET `api/v1/pages/:urlSlug`

- Retrieves a page by its URL slug.

**Path Parameter:**

urlSlug - The URL slug of the page.

**Responses:**

- **200 OK:**

  ```json
  {
    "message": "Page retrieved successfully",
    "page": {
      "id": "<pageId>",
      "title": "Example Page Title",
      "urlSlug": "example-page",
      "metaDescription": "A description of the page",
      "content": "Page content goes here"
    }
  }
  ```

- **404 Not Found:**

  ```json
  {
    "error": "Page not found"
  }
  ```

### 7. Create New Page

**Endpoint:**
POST `/api/v1/admin/pages`

- Creates a new page.

**Request Body:**

```json
{
  "title": "New Page Title",
  "urlSlug": "new-page",
  "metaDescription": "Description of the new page",
  "content": "Content for the new page"
}
```

**Responses:**

- **201 Created:**

  ```json
  {
    "message": "Page created successfully",
    "page": {
      "id": "<pageId>",
      "title": "New Page Title",
      "urlSlug": "new-page",
      "metaDescription": "Description of the new page",
      "content": "Content for the new page"
    }
  }
  ```

- **400 Bad Request:**

  ```json
  {
    "error": "Validation error for title/urlSlug"
  }
  ```

### 8. Update Page

**Endpoint:**
POST `/api/v1/admin/pages/:id`

- Updates an existing page by ID.

**Path Parameter:**

id - The ID of the page to update.

**Request Body:**

```json
{
  "title": "Updated Page Title",
  "urlSlug": "updated-page",
  "metaDescription": "Updated description",
  "content": "Updated content"
}
```

**Responses:**

- **200 OK:**

  ```json
  {
    "message": "Page updated successfully",
    "page": {
      "id": "<pageId>",
      "title": "Updated Page Title",
      "urlSlug": "updated-page",
      "metaDescription": "Updated description",
      "content": "Updated content"
    }
  }
  ```

- **400 Bad Request:**

  ```json
  {
    "error": "Validation or update failed"
  }
  ```

### 9. Delete Page

**Endpoint:**
POST `/api/v1/admin/pages/:id`

- Deletes a page by ID.

**Path Parameter:**

id - The ID of the page to delete.

**Responses:**

- **200 OK:**

  ```json
  {
    "message": "Page deleted successfully"
  }
  ```

- **400 Bad Request:**

  ```json
  {
    "error": "Page deletion failed"
  }
  ```

## Authentication

The application uses **JSON Web Tokens** (JWT) for authentication. JWT is a compact, URL-safe means of representing claims to be transferred between two parties. It allows the application to verify the identity of users and provide secure access to protected resources.

### JWT Tokens

The application uses two types of JWT tokens:

- `Access Token`: This token is used to access protected routes and resources. It has a short expiration time for security purposes.
- `Refresh Token`: This token is used to obtain a new access token when the current access token expires. It has a longer expiration time.

### Storage of Tokens

- `Access Token`: The access token is stored in the client's local storage. It is included in the Authorization header of requests to protected routes.
- `Refresh Token`: The refresh token is stored in an HTTP-only cookie to enhance security. It is also stored in the database in the refreshToken table for verification purposes.

### Token Flow

1. **User Login**: Upon successful login, the server generates an access token and a refresh token. The access token is sent to the client in the response and stored in local storage. The refresh token is sent as an HTTP-only cookie and stored in the refreshToken table in the database.
2. **Accessing Protected Routes**: When the client makes a request to a protected route, it includes the access token in the Authorization header. The server verifies the token using the requireAuth middleware.
3. **Refreshing Tokens**: If the access token expires, the client can use the refresh token to obtain a new access token by making a request to the refresh endpoint. The server verifies the refresh token stored in the cookie and generates new tokens.

## Middlewares

### Authentication Middleware: `requireAuth`

This middleware ensures that requests to protected routes are authenticated. It checks for the presence and validity of an access token in the `Authorization` header of the request in the following format:`Authorization: Bearer <access_token>`.If the access token is missing or invalid, it returns an appropriate error response.

### Usage:

The requireAuth middleware is used to protect the following routes:

- POST `/admin/create`
- POST `/admin/pages`
- PUT `/admin/pages/:id`
- DELETE `/admin/pages/:id`
- GET `/admin/pages `

Error Responses:

- **401 Unauthorized:**

  ```json
  {
    "error": "Unauthorized. No token is found"
  }
  ```

  ```json
  {
    "error": "Unauthorized. Token is invalid"
  }
  ```

## Running the server with DOCKER

```bash
# create .env file and define all environment variables

# run the docker containers
$ docker-compose up -d

# run the docker containers and rebuild images if they have changed
$ docker-compose up -d --build
```

## Running the server (without DOCKER)

### Installation first time only!

```bash
# create .env file and define all environment variables

# install the dependencies
$ npm install

# start the application
$ npm start
```

## Running the client

### Installation first time only!

```bash
# create .env file and define all environment variables

# install the dependencies
$ npm install

# start the application
$ npm run dev
```

## Shutdown

```bash
# stop the app in the terminal where it is running
$ CTRL + C

# stop the docker containers and all unnecessary volumes
$ docker-compose down -v
```
