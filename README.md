# express_sequelize_sqlite

## Overview
This works as a back-end for a task manager, create and access a database containing users, projects and tasks data.

## Features
- CRUD users.
- CRUD projects.
- Projects can create its tasks.
- A task can have an responsible if this user is a collaborator of its project.

## Installation
1. Clone the repository:
    ```bash
    git clone https://https://github.com/rodnitt/express_sequelize_sqlite.git
    ```
2. Navigate to the project directory:
    ```bash
    cd express_sequelize_sqlite
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Usage
Run the server typing the script in peoject's root
```bash
node server.js
```
The server will start to listen port 3000.

Now you can send http requests to the server.
