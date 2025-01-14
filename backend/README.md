
```bash 
.
├── contorller                    # Controllers Folder using intert,update,delete  
│   ├── user.js                      # Load and stress tests
│   ├── category.js         # End-to-end, integration tests (alternatively `e2e`)
│   └── tranasction.js                # Unit tests
├── middleware                    # Middleware Folder using store file logic check authorization
│   ├── authCheck.js          
│   └── ...                
├── prsima                    # Utils folder using store schema
│   ├── schema.prisma          # schema file 
│   └── ... 
├── routes                    # Router folder
│   ├── user.js          # Load and stress tests
│   ├── category.js         # End-to-end, integration tests (alternatively `e2e`)
│   └── tranasction.js                # Unit tests
│   └── ... 
├── uploads                    # Folder storage images files
│   └── ...                  # Load and stress tests
├── utils                    # Test files (alternatively `spec` or `tests`)
│   ├── prsima.js          # Utils folder
│   ├── upload.js         # End-to-end, integration tests (alternatively `e2e`)
│   └── ... 
├── server.js
├── DockerFile
└── ... 
``` 

# API Endpoints Summary

## Authentication

| Endpoint                            | Method | Description        | Body                                                 |
|-------------------------------------|--------|--------------------|------------------------------------------------------|
| `/api/login`                        | POST   | Login user         | `{ "username": "root", "password": "password" }`         |
| `/api/register`                     | POST   | Register user      | `{ "username": "root", "password": "poassword" }`         |

## Category

| Endpoint                            | Method | Description            | Body                        |
|-------------------------------------|--------|------------------------|-----------------------------|
| `/api/category`                     | POST   | Create category         | `{ "name": "Test1" }`       |
| `/api/category`                     | GET    | Get categories          | None                        |
| `/api/category/:id`                 | DELETE | Delete category by ID   | None                        |

## Transaction

| Endpoint                            | Method | Description            | Body                                                                                  |
|-------------------------------------|--------|------------------------|---------------------------------------------------------------------------------------|
| `/api/transaction`                      | POST   | Create transaction          | `{ "note": "test", "amount": 10000,  "categoryId": 2, "images": "{filename}" }` |
| `/api/transaction/:id`                  | GET    | Get transaction by transaction ID       | None                                                                                  |
| `/api/transaction/:id`                  | DELETE | Delete transaction by transaction ID   | None                                                                                  |
| `/api/transaction`                      | GET   | Get transaction by filters | `{ "page": "1", "limit": "10" , "month":"1" , "year":"2025` |
| `/api/transaction/category/:id`         | GET   | Get transaction by category ID  | None                                                                                  |
| `/api/transaction/account/:id`          | GET   | Get transaction by account ID  | None                                                                                  |

