## Endpoints

List of Available Endpoints:

`POST /users/add-user`<br>
`POST /users/login`

Need Authentication:

`GET /categories`<br>
`POST /categories`<br>
`PUT /categories/:id`<br>
`DELETE /categories/:id`<br>
`GET /products`<br>
`POST /products`<br>
`GET /products/:id`<br>
`PUT /products/:id`<br>
`PATCH /products/:id`<br>
`DELETE /products/:id`

Public:

`GET /pub/products`<br>
`GET /pub/products/:id`

## Details

1. POST /users/add-user

Description: Create a new user.

Request

Method: POST

Endpoint: /users/add-user

Body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

Response

Status: 201 Created

Body:

```json
{
  "id": 12,
  "email": "alice@example.com"
}
```

Error Responses

Status: 400 Bad Request

Body:

```json
{
  "message": "Email is required",
  "message": "Type must be Email",
  "message": "Password is required",
  "message": "Minimal length of password is 5",
  "message": "Email Already Exist"
}
```

2. POST /users/login

   Description: Authenticate a user.

Request

Method: POST

Endpoint: /users/login

Body:

```json
{
  "username": "string",
  "password": "string"
}
```

Response
Status: 200 OK
Body:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbGljZUBleGFtcGxlLmNvbSIsImlhdCI6MTcwMTA4NjI5Mn0.KwGDOATv5SsUkmGSk3Jb3o_JuYsg4iQx258QolcVUKU"
}
```

Error Responses

Status: 401 Unauthorized

Body:

```json
{
  "message": "Email or pass incorrect",
  "message": "Invalid Token"
}
```

3. GET /categories

   Description: Retrieve a list of categories.

Request

Method: GET

Endpoint: /categories

Response

Status: 200 OK

Body:

```json
{
        "id": 1,
        "name": "Nike",

    },
    {
        "id": 2,
        "name": "Apple",

    },
    {
        "id": 3,
        "name": "Coca-Cola",

    },
    ...
```

Error Responses

Status: 404 Not Found

Body:

```json
{
  "message": "Not Found"
}
```

4. POST /categories

   Description: Create a new category.

Request

Method: POST

Endpoint: /categories

Body:

```json
{
  "name": "string"
}
```

Response

Status: 201 Created

Body:

```json
{
  "name": "Fun Category"
}
```

Error Responses

Status: 400 Bad Request

Body:

```json
{
  "message": "Cannot add same category",
  "message": "name is required"
}
```

5. PUT /categories/:id

   Description: Update an existing category.

Request

Method: PUT

Endpoint: /categories/:id (replace :id with the actual category ID)

Body:

```json
{
  "name": "Not Fun Category"
}
```

Response

Status: 200 OK

Body:

```json
{
  "id": 12,
  "name": "Not Fun Category"
}
```

Error Responses

Status: 400 Bad Request

Body:

```json
{
  "message": "Cannot add same category"
}
```

Status: 404 Not Found

Body:

```json
{
  "message": "Not Found"
}
```

6. DELETE /categories/:id

   Description: Delete a category.

Request

Method: DELETE

Endpoint: /categories/:id (replace :id with the actual category ID)

Response

Status: 200 OK

Body:

```json
{ "message": `category with id ${categoryId} has been deleted` }
```

Error Responses

Status: 404 Not Found

Body:

```json
{
  "message": "Not Found"
}
```

7. GET /products

   Description: Retrieve a list of products.

Request

Method: GET

Endpoint: /products

Headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbGljZUBleGFtcGxlLmNvbSIsImlhdCI6MTcwMTA4NjI5Mn0.KwGDOATv5SsUkmGSk3Jb3o_JuYsg4iQx258QolcVUKU"
}
```

Response

Status: 200 OK

Body:

```json
{
        "id": 21,
        "name": "Tambah Produk 1",
        "description": "deskripsi untuk tambahan produk 1",
        "price": 70000,
        "stock": 12,
        "imgUrl": "Gambarmu",
        "categoryId": 1,
        "authorId": 1,
        "Category": {
            "id": 1,
            "name": "Nike",
        },
        "User": {
            "id": 1,
            "username": "Alice",
            "email": "alice@example.com",
            "password": "$2a$08$JQqjML5SEed5il3Z8GyigeCDx/Gt2jHrmER8DUAbCcoTZE5AyDBue",
            "role": "admin",
            "phoneNumber": "123-456-7890",
            "address": "123 Main St",
        }
    },
    ...
```

Error Responses

Status: 401 Unauthorized

Body:

```json
{
  "message": "Invalid Token"
}
```

8. POST /products

   Description: Create a new product.

Request

Method: POST

Endpoint: /products

Headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbGljZUBleGFtcGxlLmNvbSIsImlhdCI6MTcwMTA4NjI5Mn0.KwGDOATv5SsUkmGSk3Jb3o_JuYsg4iQx258QolcVUKU"
}
```

Body:

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "string",
  "categoryId": "integer"
}
```

Response

Status: 201 Created

Body:

```json
{
  "id": 22,
  "name": "HP murah",
  "description": "HP murah tetapi canggih",
  "price": 700000,
  "stock": 12,
  "imgUrl": "Gambarmu",
  "categoryId": 1,
  "authorId": 1
}
```

Error Responses

Status: 400 Bad Request

Body:

```json
{
  "message": "string"
}
```

Status: 401 Unauthorized

Body:

```json
{
  "message": "Invalid Token"
}
```

9. GET /products/:id

   Description: Retrieve details of a specific product.

Request

Method: GET

Endpoint: /products/:id (replace :id with the actual product ID)

Headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbGljZUBleGFtcGxlLmNvbSIsImlhdCI6MTcwMTA4NjI5Mn0.KwGDOATv5SsUkmGSk3Jb3o_JuYsg4iQx258QolcVUKU"
}
```

Response

Status: 200 OK

Body:

```json
{
  "id": 1,
  "name": "Nike Air Max",
  "description": "High-performance running shoes",
  "price": 1819860,
  "stock": 50,
  "imgUrl": "https://example.com/nike-air-max.jpg",
  "categoryId": 1,
  "authorId": null
}
```

Error Responses

Status: 401 Unauthorized

Body:

```json
{
  "message": "Invalid Token"
}
```

Status: 404 Not Found

Body:

```json
{
  "message": "Not Found"
}
```

10. PUT /products/:id

    Description: Update an existing product.

Request

Method: PUT

Endpoint: /products/:id (replace :id with the actual product ID)

Headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbGljZUBleGFtcGxlLmNvbSIsImlhdCI6MTcwMTA4NjI5Mn0.KwGDOATv5SsUkmGSk3Jb3o_JuYsg4iQx258QolcVUKU"
}
```

Body:

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "string",
  "categoryId": "integer"
}
```

Response

Status: 200 OK

Body:

```json
{
  "id": 1,
  "name": "Nike Air Max Updated",
  "description": "Super High-performance running shoes",
  "price": 18198680,
  "stock": 500,
  "imgUrl": "https://example.com/nike-air-max.jpg",
  "categoryId": 1,
  "authorId": null
}
```

Error Responses

Status: 400 Bad Request

Body:

```json
{
  "message": "String"
}
```

Status: 401 Unauthorized

Body:

```json
{
  "message": "Invalid Token"
}
```

Status: 403 Forbidden

Body:

```json
{
  "message": "forbidden"
}
```

Status: 404 Not Found

Body:

```json
{
  "message": "Not Found"
}
```

11. PATCH /products/:id

    Description: Update an existing product, specifically on one selected field.

Request

Method: PATCH

Endpoint: /products/:id (replace :id with the actual product ID)

Headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbGljZUBleGFtcGxlLmNvbSIsImlhdCI6MTcwMTA4NjI5Mn0.KwGDOATv5SsUkmGSk3Jb3o_JuYsg4iQx258QolcVUKU"
}
```

File:

```json
{
  "image": "file"
}
```

Response

Status: 200 OK

Body:

```json
{
  "message": `image ${productToPatch.id} success to update`
}
```

Error Responses

Status: 401 Unauthorized

Body:

```json
{
  "message": "Invalid Token"
}
```

Status: 403 Forbidden

Body:

```json
{
  "message": "forbidden"
}
```

Status: 404 Not Found

Body:

```json
{
  "message": "Not Found"
}
```

12. DELETE /products/:id

    Description: Delete a product.

Request

Method: DELETE

Endpoint: /products/:id (replace :id with the actual product ID)

Headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbGljZUBleGFtcGxlLmNvbSIsImlhdCI6MTcwMTA4NjI5Mn0.KwGDOATv5SsUkmGSk3Jb3o_JuYsg4iQx258QolcVUKU"
}
```

Response

Status: 200 OK

Body:

```json
{ "msg": `product with id ${productId} has been deleted` }
```

Error Responses

Status: 401 Unauthorized

Body:

```json
{
  "message": "Invalid Token"
}
```

Status: 403 forbidden

Body:

```json
{
  "message": "forbidden"
}
```

Status: 404 Not Found

Body:

```json
{
  "message": "Not Found"
}
```

13. GET /pub/products

    Description: Retrieve a list of products (public access).

Request

Method: GET

Endpoint: /pub/products

Response

Status: 200 OK

Body:

```json
{
        "id": 21,
        "name": "Tambah Produk 1",
        "description": "deskripsi untuk tambahan produk 1",
        "price": 70000,
        "stock": 12,
        "imgUrl": "Gambarmu",
        "categoryId": 1,
        "authorId": 1,
    },
    ...
```

Error Responses

Status: 404 Not Found

Body:

```json
{
  "message": "Not Found"
}
```

14. GET /pub/products/:id

    Description: Retrieve details of a specific product (public access).

Request

Method: GET

Endpoint: /pub/products/:id (replace :id with the actual product ID)

Response

Status: 200 OK

Body:

```json
{
  "id": 1,
  "name": "Nike Air Max",
  "description": "High-performance running shoes",
  "price": 1819860,
  "stock": 50,
  "imgUrl": "https://example.com/nike-air-max.jpg",
  "categoryId": 1,
  "authorId": null
}
```

Error Responses

Status: 404 Not Found

Body:

```json
{
  "message": "Not Found"
}
```

## Global Errors

1. Internal Server Error

   Description: Returned when an unexpected server error occurs.

   Status : 500 Internal Server Error

   Body:

   ```json
   {
     "message": "Internal Server Error"
   }
   ```
