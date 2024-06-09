# Employee Management Service

## Used Technology
- Nest.js
- PostgreSQL
- TypeORM
- Winston (for error logging)
- Husky (for Git hooks)
- Continuous Integration (CI) with GitHub Actions
- Artillery (for load testing)

## Overview
This service provides an API to manage employee data, including fetching hierarchical employee structures efficiently. The service is designed to handle high request volumes and large datasets by leveraging efficient database queries and caching.

## Features
- Fetch employee data based on position hierarchy.
- Efficient caching to minimize database load.
- Scalable architecture to handle high concurrency.
- Error logging with Winston.
- Pre-commit checks with Husky.
- Continuous Integration (CI) using GitHub Actions.
- Implemented pull request template.

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/durjoy07/employee-management-service.git
    ```
2. Navigate to the project directory:
    ```bash
    cd employee-management-service
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

### Configuration
1. Create a `.env` file in the root directory and add your database configuration:
    ```env
    DB_URI=
    PORT=4000
    ```

## Important Scripts

### Type Checking, Linting, Formatting

Typescript check:
```bash
npm run tsc
```

Linter check:
```bash
npm run lint
```

Format check:
```bash
npm run format:check
```

Format fix:
```bash
npm run format:fix
```

### Migrations

Please make sure you database migrations are inline with the files in the `migration` folder. Otherwise you will get migration errors.

Generate migrations file:
```bash
npm run migration:generate
```

Run migrations file:
```bash
npm run migration:run
```

Revert migrations file:
```bash
npm run migration:revert
```

### Running the App

Run in dev mode:
```bash
npm run dev
```

Build And run the app:
In production:
```bash
npm run start:prod
```

Run unit test:
```bash
npm run test
```

The service will be available at `http://localhost:4000`.

### API Documentation
The API documentaion will be available at `http://localhost:4000/docs`

## Load Testing

### Introduction
To ensure that our service can handle a high number of requests, we use Artillery for load testing. This helps us simulate traffic and identify potential bottlenecks.

### Installing Artillery
Artillery is a powerful load testing toolkit which can be installed globally via npm:
```bash
npm install -g artillery (make sure you have install this globally)

Run load test:
```bash
artillery run load-test.yml
```

### Deploy on EC2
Go to your EC2 instance console, then follow below steps:

```bash
sudo su
sudo yum update -y
Sudo yum install -y docker
Sudo docker —version
sudo service docker start

sudo usermod -aG docker ec2-user
sudo docker info
Sudo yum install git 
ssh-keygen -t ed25519 -C "your github mail" 
```

Docker build:
```bash
docker build -t employee-management-service:0.0.1 .
```

Docker run:
```bash
docker run -d -p 4000:4000 --name employee-management-service employee-management-service:0.0.1 
```

### API Endpoints

- **POST /auth/login**
  - Credentials {"username" : "user", "password": "user321"}
  - After successful login, you will get token

- **GET /employees/by-id/:id**
  - Fetch all employees with a position ID greater than the given employee's position ID, including hierarchical structure.

- **GET /employees/auth/by-id/:id** (This is a private route, You have to send bearer token)
  - Fetch all employees with a position ID greater than the given employee's position ID, including hierarchical structure.

- **POST /employee**
  - You can add an employee using this API

Sample payload for this post API
```bash
{
  "name": "string",
  "position_id": 0,
  "position_name": "string"
}
```