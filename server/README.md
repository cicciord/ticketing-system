# Server

## Generate empty Database

```sh
sqlite3 db/TicSys.db < db/templates/empty_tables.sql
```

If a database already exists and you want to delete all data, you can use the following command:

```sh 
rm db/TicSys.db && sqlite3 db/TicSys.db < db/templates/empty_tables.sql
```
