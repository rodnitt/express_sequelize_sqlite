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
Run the server typing the script in project's root
```bash
node server.js
```
The server will start to listen port 3000.

Now you can send http requests to the server.

### Projects
1. Receive a list containing **all projects**.
    ```
    GET <url>/project/list
    ```

1. **Create** a new project in database.
    ```
    POST <url>/project

    body {
        name: STRING,
        summary: TEXT,
        startDate: DATE,
        dueDate: DATE
    }
    ```

1. Get the **quantities of tasks** in project grouped by status.
    ```
    GET <url>/project/<project-id>/progress
    ```
    Return an array with three integers: the quantities of task in each status, e.g. [1, 2, 3] means that 1 task is in *Backlog*, 2 tasks are *In Progress* and 3 tasks are *Completed*. The order of status counters is always the same: Backlog, In Progress and Completed.

1. Obtain a list with **all tasks** of a project.
    ```
    GET <url>/project/<project-id>/tasks
    ```
    *Note: by default, tasks will be in order of due date and priority*