# Server

## Initialize the database

```sh
sqlite3 db/tickets.db < db/templates/starter_tables.sql
```

If a database already exists and you want to restore all the example data, you can use the following command:

```sh 
rm db/tickets.db && sqlite3 db/tickets.db < db/templates/starter_tables.sql
```

## Environment variables

To set up example environment variables, you can use the following command:

```sh
cp .env.example .env
```