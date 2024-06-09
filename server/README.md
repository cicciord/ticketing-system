# Server

## Generate empty Database

```sh
sqlite3 db/tsys.db < db/empty_tables.sql
```

If a database already exists and you want to delete all data, you can use the following command:

```sh 
rm db/tsys.db && sqlite3 db/tsys.db < db/empty_tables.sql
```
