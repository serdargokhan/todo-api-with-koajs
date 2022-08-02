# Todo API with KoaJS

This is a todo API written with KoaJS framework which has very similarity with Express. This todo API uses MongoDB as the database

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_URI`

`ACCESS_TOKEN`

## API Usage

#### Register

```
  POST /api/register
```

Everyone can send a request to this endpoint to register. You must send a request like below. All fields are mandatory.

```json
{
    "username": "serdargokhan",
    "email": "serdargokhan@test.com",
    "password": "1234"
}
```

#### Login

```
  POST /api/login
```

Everyone can send a request to this endpoint to login. You must send a request like below. All fields are mandatory. After you login successfully the API will send you an AccessToken and you can use it for other routes for authentication.

```json
{
    "username": "serdargokhan",
    "password": "1234"
}
```

#### Get all todos

```
  GET /api/todo
```

Everyone can send a request to this endpoint. There is no authentication for this route. Response would be:

```json
{
    "status": "OK",
    "todos": [
        {
            "_id": "62e282be647b724ed8db802c",
            "todo": "Hello Koa.js",
            "author": "Serdar Gökhan",
            "authorEmail": "gokhan@test.com",
            "createdAt": "2022-08-01T07:45:06.622Z",
            "updatedAt": "2022-08-02T10:56:45.300Z"
        }
    ]
}
```

#### Create single todo

```
  POST /api/todo
```

To create single todo you must send `todo` and `completed` fields in your request body. This route has authentication and uses JWT. So you need to specify Bearer token in the following format: `Bearer {Your Token}`

| Params   | Type     | Description                    |
| :------- | :------- | :----------------------------- |
| `todoId` | `string` | **Mandatory** Provide `todoId` |

```json
{
    "todo": "Hello Koa.js",
    "completed": true
}
```

#### Update single todo

```
  PUT /api/todo/:todoId
```

To create single todo you must send `todo` or `completed` field in your request body. This route has authentication and uses JWT. So you need to specify Bearer token in the following format: `Bearer {Your Token}`

| Params   | Type     | Description                    |
| :------- | :------- | :----------------------------- |
| `todoId` | `string` | **Mandatory** Provide `todoId` |

The response would be:

```json
{
    "status": "OK",
    "message": "Found 1 todo(s) in the database with the id of undefined. 1 of your todo(s) has been modified."
}
```

#### Delete single todo

```
  DELETE /api/todo/:todoId
```

To delete single todo you must send query params in the URL. This route has authentication and uses JWT. So you need to specify Bearer token in the following format: `Bearer {Your Token}`

| Params   | Type     | Description                    |
| :------- | :------- | :----------------------------- |
| `todoId` | `string` | **Mandatory** Provide `todoId` |

The response would be:

```json
{
    "status": "OK",
    "message": "Deleted 1 todo(s) in the database with the id of 62e282be647b724ed8db802c"
}
```
