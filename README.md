
You need to have node and mongo installed.

Setup mongo details in `.env` variable in root project folder:

```APP=development
PORT=3000
DB_TYPE=mongo
DB_HOST=localhost
DB_PORT=27017
DB_NAME=balkondb
DB_USER=
DB_PASSWORD=
JWT_ENCRYPTION=pBl8d48NVAhGZz9dLOjz
JWT_EXPIRATION=10000
```

Run this in root project folder to install dependencies:

```$npm install```

and then to run api server:

```$npm run dev```