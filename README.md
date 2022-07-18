# React Admin Sample Client

This is the front end application for [React Admin Sample API](https://github.com/graduenz/react-admin-sample-api).

- [React Admin Sample Client](#react-admin-sample-client)
  - [Requests and responses](#requests-and-responses)
    - [GET /{id}](#get-id)
      - [Route template](#route-template)
      - [Example](#example)
    - [GET /](#get-)
      - [Query parameters](#query-parameters)
      - [Example](#example-1)
    - [POST /](#post-)
      - [Example](#example-2)
    - [PUT /{id}](#put-id)
      - [Route template](#route-template-1)
      - [Example](#example-3)
    - [PUT /](#put-)
      - [Query parameters](#query-parameters-1)
      - [Example](#example-4)
    - [DELETE /{id}](#delete-id)
      - [Route template](#route-template-2)
      - [Example](#example-5)
    - [DELETE /](#delete-)
      - [Query parameters](#query-parameters-2)
      - [Example](#example-6)

## Requests and responses

### GET /{id}

Known as `GetOne`, will be used for `getOne` method.

#### Route template

| Parameter name | Description | Required? | Default value |
|----------------|-------------|-----------|---------------|
| id             | Entity ID   | Yes       |               |

#### Example

```
GET http://localhost:5084/makes/5ac9d238-0805-49a5-9ec8-4cb2a11a4d21

HTTP/1.1 200 OK
Content-Type: application/json
{
    "id": "5ac9d238-0805-49a5-9ec8-4cb2a11a4d21",
    "name": "Cadillac",
    "models": null
}
```

---

### GET /

Known as `GetMany`, will be used for both `getList` and `getMany` methods. Also, it's used for `getManyReference`, but for children entities.

#### Query parameters

| Parameter name | Description                                        | Required? | Default value |
|----------------|----------------------------------------------------|-----------|---------------|
| pageIndex      | Page index (1-based)                               |           |               |
| pageSize       | Page size                                          |           |               |
| sort           | Sort key                                           |           | Id            |
| order          | Sort order (ASC, DESC)                             |           | ASC           |
| filter.ids     | Array of entity IDs                                |           |               |
| filter.???     | Any other filter parameter for that specific route |           |               |

Query parameters with a `filter.` prefix will be bound to a back end object representing known filters for that entity.

#### Example

```
GET http://localhost:5084/makes?pageIndex=1&pageSize=5&sort=name&order=ASC&filter.name=a

HTTP/1.1 200 OK
Content-Type: application/json
Content-Range: Make 0-5/13
[
    {
        "id": "5ac9d238-0805-49a5-9ec8-4cb2a11a4d21",
        "name": "Cadillac",
        "models": null
    },
    {
        "id": "a76819ee-157d-48d5-8970-816eb670c802",
        "name": "Jaguar",
        "models": null
    },
    {
        "id": "4219121d-5397-435d-a8d6-88eef73b4f32",
        "name": "Lamborghini",
        "models": null
    },
    {
        "id": "153c5607-545a-4546-a155-0162485124e9",
        "name": "Mazda",
        "models": null
    },
    {
        "id": "199d39e9-07cb-4f26-8bf8-4c65fa7af549",
        "name": "Tesla",
        "models": null
    }
]
```

---

### POST /

Known as `Create`, will be used for `create` method.

#### Example

```
POST http://localhost:5084/makes
Content-Type: application/json
{
    "name": "Honda"
}

HTTP/1.1 200 OK
Location: https://localhost:7084/Makes/bf7021e1-f930-4caa-2543-08da66a051f1
Content-Type: application/json
{
    "id": "bf7021e1-f930-4caa-2543-08da66a051f1",
    "name": "Honda",
    "models": null
}
```

---

### PUT /{id}

Known as `UpdateOne`, will be used for `update` method.

#### Route template

| Parameter name | Description | Required? | Default value |
|----------------|-------------|-----------|---------------|
| id             | Entity ID   | Yes       |               |

#### Example

```
PUT http://localhost:5084/makes/bf7021e1-f930-4caa-2543-08da66a051f1
Content-Type: application/json
{
    "name": "Hondaaa"
}

HTTP/1.1 200 OK
Content-Type: application/json
{
    "id": "bf7021e1-f930-4caa-2543-08da66a051f1",
    "name": "Hondaaa",
    "models": null
}
```

---

### PUT /

Known as `UpdateMany`, will be used for `updateMany` method.

#### Query parameters

| Parameter name | Description | Required? | Default value |
|----------------|-------------|-----------|---------------|
| ids            | Entity IDs to be updated   | Yes       |               |

#### Example

```
PUT http://localhost:5084/makes?ids=bf7021e1-f930-4caa-2543-08da66a051f1&ids=5ac9d238-0805-49a5-9ec8-4cb2a11a4d21&ids=a76819ee-157d-48d5-8970-816eb670c802
Content-Type: application/json
{
    "name": "UpdateManyHasBeenDone"
}

HTTP/1.1 200 OK
Content-Type: application/json
[
    {
        "id": "bf7021e1-f930-4caa-2543-08da66a051f1",
        "name": "UpdateManyHasBeenDone",
        "models": null
    },
    {
        "id": "5ac9d238-0805-49a5-9ec8-4cb2a11a4d21",
        "name": "UpdateManyHasBeenDone",
        "models": null
    },
    {
        "id": "a76819ee-157d-48d5-8970-816eb670c802",
        "name": "UpdateManyHasBeenDone",
        "models": null
    }
]
```

---

### DELETE /{id}

Known as `DeleteOne`, will be used for `delete` method.

#### Route template

| Parameter name | Description | Required? | Default value |
|----------------|-------------|-----------|---------------|
| id             | Entity ID   | Yes       |               |

#### Example

```
DELETE http://localhost:5084/makes/bf7021e1-f930-4caa-2543-08da66a051f1

HTTP/1.1 200 OK
Content-Type: application/json
{
    "id": "bf7021e1-f930-4caa-2543-08da66a051f1",
    "name": "UpdateManyHasBeenDone",
    "models": null
}
```

---

### DELETE /

Known as `DeleteMany`, will be used for `deleteMany` method.

#### Query parameters

| Parameter name | Description | Required? | Default value |
|----------------|-------------|-----------|---------------|
| ids            | Entity IDs to be deleted   | Yes       |               |

#### Example

```
DELETE http://localhost:5084/makes?ids=153c5607-545a-4546-a155-0162485124e9&ids=99f3ade4-1804-463e-8257-02ce9bc153ad&ids=199d39e9-07cb-4f26-8bf8-4c65fa7af549

HTTP/1.1 200 OK
Content-Type: application/json
[
    "153c5607-545a-4546-a155-0162485124e9",
    "99f3ade4-1804-463e-8257-02ce9bc153ad",
    "199d39e9-07cb-4f26-8bf8-4c65fa7af549"
]
```