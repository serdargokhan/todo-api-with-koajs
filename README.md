# Todo API with KoaJS

This is a todo api written with KoaJS framework. It uses MongoDB as the database

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_URI`

## API Usage

#### Get all todos

```
  GET /api/todo
```

Everyone can send a request to this endpoint. There is no authentication.

```json
{
    "status": "OK",
    "todos": [
        {
            "_id": "62e282be647b724ed8db802c",
            "todo": "Hello Koa.js",
            "author": "Serdar Gökhan",
            "createdAt": "2022-07-28T12:36:14.293Z"
        }
    ]
}
```

#### Create single todo

```
  POST /api/todo
```

To create single todo you must send `todo`, `author`, `authorEmail`, and `completed` fields in your request body.

```json
{
    "todo": "Hello Koa.js",
    "author": "Serdar Gökhan",
    "authorEmail": "test@test.com",
    "completed": true
}
```

#### Update single todo

```
  PUT /api/todo/:todoId
```

To update single todo you must send `todo` field in your request body.

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

To delete single todo you must send query params in the URL

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
