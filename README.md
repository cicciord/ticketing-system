[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/Y8bW3OQP)

# Exam #1: "Ticketing System"

## Student: s323518 LATERZA FRANCESCO

## React Client Application Routes

- Route `/`: home page containing the list of tickets
- Route `/login`: login page
- Route `/create-ticket`: form to create a new ticket

## API Server

- GET `/api/tickets`
  - response body content: list of tickets
- GET `api/tickets/:id/contents`
  - request parameters: id of the ticket
  - response: additional blocks of text associated to the ticket
- POST `/api/tickets`
  - request body content: ticket title, category and inital block of text
  - response body content: the created ticket id
- POST `/api/tickets/:id/contents`
  - request parameters: id of the ticket
  - request body content: new block of text
  - response body content: new block of text id
- PATCH `/api/tickets/:id/open`
  - request parameters: id of the ticket
  - response body content: updated ticket id
- PATCH `/api/tickets/:id/close`
  - request parameters: id of the ticket
  - response body content: updated ticket id
- PATCH `/api/tickets/:id/category`
  - request parameters: id of the ticket
  - request body content: new category
  - response body content: updated ticket id
- POST `/api/sessions`
  - request body content: username and password
  - response body content: user id, username and admin flag
- GET `/api/sessions/current`
  - response body content: user id, username and admin flag
- DELETE `/api/sessions/current`
  - response body content: empty
- GET `api/auth-token`
  - response body content: token

## API Server2

- GET `/api/estimation`
  - request query parameters: title and category
  - response body content: estimation (in hours)

## Database Tables

- Table `Users` - contains id username password salt admin
- Table `Tickets` - contains id owner_id state category title timestamp text
- Table `AdditionalContents` - contains id ticket_id author_id timestamp text

## Main React Components

- `Home` (in `Home.jsx`): landing page, renders the list of tickets
- `Ticket` (in `Ticket.jsx`): card showing the ticket data
- `ExpandedTicket` (in `ExpandedTicket.jsx`): expanded view of a ticket containing the initial block of text and the additional blocks of text
- `Login` (in `Login.js`): login form
- `CreateTicket` (in `CreateTicket.jsx`): form to create a new ticket
- `ConfirmTicketModal` (in `ConfirmTicketModal.jsx`): modal to confirm the ticket creation

## Screenshot

![Home Screenshot](./img/home.png)

![Form Screenshot](./img/form.png)

## Users Credentials

- username: Satoshi Nakamoto, password: genesisBlock123 (admin)
- username: Hal Finney, password: hodlForever
- username: Peter Todd, password: opensourceOrDie (admin)
- username: Vitalik Buterin, password: ethIsKing
- username: Maxim Orlovsky, password: rgbRevolution
