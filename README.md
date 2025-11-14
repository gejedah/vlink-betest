# Express Customer Admin book api 

This project is a simple Book transaction rest api application built with Express.js. It provides a RESTful API for performing operations on book, cart, transaction records.

Database is on localhost so migrate migration file and later seed table first

There is also example data on example_data folder

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd express-customer-crud
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the `.env.example` file and configure your environment variables.

## Usage

To start the application, run:
```
npm start
```

For development, you can use:
```
npm run dev
npx sequelize-cli db:seed:all

Install CLI (dev):

npm install --save-dev sequelize-cli
Run migrations (default env uses development and config.js):

npx sequelize-cli db:migrate
Run migrations for test env:

npx sequelize-cli db:migrate --env test
Undo last migration:

npx sequelize-cli db:migrate:undo
Undo all migrations:

npx sequelize-cli db:migrate:undo:all
Run all seeders:

npx sequelize-cli db:seed:all
Undo seeders:

npx sequelize-cli db:seed:undo:all
Optional: add npm scripts to package.json for convenience:

"migrate": "npx sequelize-cli db:migrate"
"migrate:undo": "npx sequelize-cli db:migrate:undo"
```

## API Endpoints

  
- **Get Customer**
  - `GET /customers/:id`
  
- **Update Customer**
  - `PUT /customers/:id`
  
- **Delete Customer**
  - `DELETE /customers/:id`

## Testing

To run the tests, use:
```
npm test
```

## Environment Variables

Make sure to set the following environment variables in your `.env` file:
- `DATABASE_URL`: The URL for your database connection.
- `PORT`: The port on which the server will run.

## License

This project is licensed under the MIT License.
