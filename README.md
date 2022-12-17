# Boilerplate Typescript + Node + Postgres + Docker

## Running Docker containers

### Building the image

`docker compose build`

### Starting server

`docker compose up -d`

### Stopping server

`docker compose down`

### Connecting to Postgres server

`set PGPASSWORD=password && psql -d postgres -U postgres -d testdb`

### Simple query

`SELECT * FROM items;`

### Use .vscode configuration for debugging
