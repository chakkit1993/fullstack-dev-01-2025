# Backend ( express + prisma )

![Alt text](./prisma-erd.svg)

# Folder Stuctrue Summary

```bash 
.
├── contorller                    # Controllers Folder using intert,update,delete  
│   ├── user.js                      
│   ├── category.js         
│   └── tranasction.js                
├── middleware                    # Middleware Folder using store file logic check authorization
│   ├── authCheck.js          
│   └── ...                
├── prsima                    # Utils folder using store schema
│   ├── schema.prisma          # schema file 
│   └── ... 
├── routes                    # Router folder
│   ├── user.js         
│   ├── category.js        
│   └── tranasction.js                
│   └── ... 
├── uploads                    # Folder storage images files
│   └── ...                   
├── utils                    #  Utils folder
│   ├── prsima.js          # Prisma object
│   ├── upload.js          # multer object for upload image  
│   └── ... 
├── server.js               #index file
├── DockerFile
├── docker-compose.yaml
└── ... 
``` 
## Installation

### Create Dockerfile
```bash
    FROM node:latest

    # working directory
    WORKDIR /app

    # copy package.json
    COPY package*.json ./

    # install nodemon
    RUN npm install -g nodemon
    # install package.json

    # install nodemon
    RUN npm install prisma --legacy-peer-deps

    RUN npm install
    # copy ./ to ./
    COPY ./ ./

    # # run npx prisma generate
    RUN npx prisma generate

    #export port:8080
    EXPOSE 8080

    #run "npm run dev"
    # CMD ["npm", "run","dev"]
    CMD ["sh", "start-app.sh"]

```
### Create docker-compose.yml
```bash
version: '3.8'
services:
  postgres:
    image: postgres:latest
    container_name: "postgres_db"
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: root
      POSTGRES_DB: postgres_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - prisma-networks
  pgadmin:
    image: dpage/pgadmin4
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@admin.com
      PGADMIN_DEFAULT_PASSWORD: root
    ports:
      - "5050:80"
    depends_on:
      - postgres
    networks:
      - prisma-networks
  backend:
    build: .
    container_name: "backend"
    restart: "always"
    ports:
      - "8080:8080"
    depends_on:
      - postgres
    networks:
      - prisma-networks

volumes:
  postgres_data:

networks:
  prisma-networks:
    driver: bridge
```

### Run Dokcer-Compose For Create Docker Container ( postgres , pgadmin4 , express )
```bash
 docker-compose up
```


### package.json
```bash
 //package.json
{
  {
  "name": "express-example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": 
    {
    "@prisma/client": "^6.2.1",
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "fs": "^0.0.1-security",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "path": "^0.12.7"
    }
}
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
| `/api/category`                     | GET    | Get categories          | `{ "page": "1", "limit": "10"` |
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

## Images
| Endpoint                            | Method | Description            | Body                        |
|-------------------------------------|--------|------------------------|-----------------------------|
| `/api/image/:id`                    | GET   | Get Image by ID         | None                          |
