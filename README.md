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
    GET {url}/project/list
    ```

    ---
1. **Get a project**
    ```
    GET {url}/project/{project-id}
    ```

    ---
1. Obtain a list with **all tasks** of a project.
    ```
    GET {url}/project/{project-id}/tasks
    ```
    *Note: by default, tasks will be in order of due date and priority*

    You can filter tasks by its due dates, setting an initial and a final date that the task's due date must be between them. You can send both parameters or only one.
    ```
    GET {url}/project/{project-id}/tasks?initial=2025-10-01&final=2025-10-31
    ```

    While tasks aren't removed from database, but marked as deleted, they won't be returned in response. If you want to include them too, add the query parameter ``includeDeleted``
    ```
    GET {url}/project/{project-id}/tasks?includeDeleted
    ```

    ---
1. Obtain a list with **all collaborators** in project
    ```
    GET {url}/project/{project-id}/users
    ```

    ---
1. Get the **quantities of tasks** in project grouped by status.
    ```
    GET {url}/project/{project-id}/progress
    ```
    Return an array with three integers: the quantities of task in each status, e.g. [1, 2, 3] means that 1 task is in *Backlog*, 2 tasks are *In Progress* and 3 tasks are *Completed*. The order of status counters is always the same: Backlog, In Progress and Completed.

    ---
1. **Create** a new project in database.
    ```
    POST {url}/project

    body: {
        name: STRING,
        summary: TEXT,
        startDate: DATE,
        dueDate: DATE
    }
    ```

    ---
1. **Update a project**
    ```
    PUT {url}/project/{project-id}

    body: {
        name: STRING,
        summary: TEXT,
        startDate: DATE,
        dueDate: DATE
    }
    ```

    ---
1. **Delete a project**
    ```
    DELETE {url}/project/{project-id}
    ```
    When a project is removed from database, all tasks associated to this project will also be removed.

### Tasks
1. **Create a task in project**
    ```
    POST {url}/task/{project-id}

    body: {
        title: STRING,
        description: TEXT,
        status: STRING,
        priority: INTEGER,
        dueDate: DATE
    }
    ```

    ---
1. **Get a task**
    ```
    GET {url}/task/{task-id}
    ```
    Return the specified task.

    ---
1. **Update a task**
    ```
    PUT {url}/task/{task-id}

    body: {
        title: STRING,
        description: TEXT,
        status: STRING,
        priority: INTEGER,
        dueDate: DATE
    }
    ```
    The field **status** must be either *"backlog"*, *"in progress"* or *"completed"*.
    The field **priority** must be an integer between 0 to 4. Those numbers represent the priority levels *optional*, *normal*, *important* and *urgent* respectively.

    ---
1. **Delete a task**
    ```
    DELETE {url}/task/{task-id}
    ```
    A paranoid delete is performed, that is, instead of the task is truly deleted, it is marked as deleted and kept in database.
    
    *Note: the only way to remove tasks from database is deleting the project they belongs to.*

    ---
1. **Restore** a deleted task
    ```
    PUT {url}/task/{task-id}/restore
    ```
    Make a task in database no longer marked as deleted, if it's the case.

### Users
1. Get a list with **all users**
    ```
    GET {url}/user/list
    ```

    ---
1. Get a **specified user**
    ```
    GET {url}/user/{user-id}
    ```

    ---
1. Create a **new user**
    ```
    POST {url}/user

    body: {
        name: STRING,
        email: STRING,
        password: STRING
    }
    ```

    ---
1. **Update a user**
    ```
    PUT {url}/user/{user-id}

    body: {
        name: STRING,
        email: STRING,
        password: STRING
    }
    ```

    ---
1. **Delete a user**
    ```
    DELETE {url}/user/{user-id}
    ```

### Collaboration
The users can collaborate being assigned to projects and to tasks that belongs to those projects.

1. Assign an **user to project**

    Assign to project an user by *id*.
    ```
    PUT {url}/project/{project-id}/assign?userId=1
    ```
    Assign to project a user by *email*.
    ```
    PUT {url}/project/{project-id}/assign?userEmail=example@example.com
    ```
    Assign an user and associate a *role* to it.
    ```
    PUT {url}/project/{project-id}/assign?userId=1&role=admin
    ```

1. Unassign an user to project
    ```
    PUT {url}/project/{project-id}/unassign
    ```
    Like assign request, this one can receive *userId* or *userEmail* as query parameters.

1. Assign an **user to task**

    An user can be marked as *responsible* or *author* of a task.

    The user can be selected passing its id as query paramenter.
    ```
    PUT {url}/task/{task-id}/assign?userId=1
    ```
    Also you can pass the user email.
    ```
    PUT {url}/task/{task-id}/assign?userEmail=example@example.com
    ```
    To unassign an user from a task, just send the request without any user indetifier.
    ```
    PUT {url}/task/{task-id}/assign
    ```