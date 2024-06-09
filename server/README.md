# Server

## Generate empty Database

```sh
sqlite3 db/tickets.db < db/templates/empty_tables.sql
```

If a database already exists and you want to delete all data, you can use the following command:

```sh 
rm db/tickets.db && sqlite3 db/tickets.db < db/templates/empty_tables.sql
```

If you want to create a database with the example starting data, you can use the `starter_tables.sql` file instead.
