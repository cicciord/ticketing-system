rm db/tickets.db && sqlite3 db/tickets.db < db/templates/empty_tables.sql
node db/utils/createUsers.js
node db/utils/createTickets.js
node db/utils/createAdditionalContents.js
