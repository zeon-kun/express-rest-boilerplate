# ExpressJS REST API Boilerplate

<a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" /></a> <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" /></a> <a href="https://jwt.io/"><img src="https://img.shields.io/badge/JWT-FB015B?style=for-the-badge" /></a>

A cookiecutter template to create REST API with ExpressJS and MySQL, with JWT authentication.

## Boilerplate Features:
- Registration
- Login
- JWT authentication
- Private routes example
- Schema Validation check (email validation, minimum characters, etc.)
- Password Encryption
- MySQL DB
- API rate limit

## Setup
1. Clone the project
```
git clone https://github.com/zeon-kun/express-rest-boilerplate.git
```
2. Install packages
```
npm install
```
3. Setup environment variables: Create .env file in root of the project and set enviroment variables

4. Run the project
```
node app.js
```
OR, if you have [nodemon](https://www.npmjs.com/package/nodemon) installed
```
npm start
```

## API endpoints

| **Endpoint** | **Purpose** | **Features** |
| :------------- | :---------- | :----------- |
| / | Homepage  | None |
| /api/user/register | Registration route that saves information of a new user on the database  | Duplicate user check, password hashing |
| /api/user/login | Login route that returns token on successful login  | User existance check, Password match check, JWT Creation |
| /api/private | Example private route that can't be accessed without a token  | "auth-token" header is required, which means user must be logged in to access this route |
