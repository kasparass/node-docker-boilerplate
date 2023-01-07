# Boilerplate Typescript + Node + Postgres + Docker

## Running Docker containers

### Building the image

`docker build -t node-docker-boilerplate .`

### Starting server

`docker compose up -d`

### Stopping server

`docker compose down`

### Connecting to Postgres server

`set PGPASSWORD=password && psql -U postgres -d testdb`

### Simple query

`SELECT * FROM items;`

### Use .vscode configuration for debugging

### Volumes location on Windows system

`\\wsl$\docker-desktop-data\version-pack-data\community\docker\volumes\`

### Running pgAdmin

`docker pull dpage/pgadmin4`

```
docker run -p 5050:80 \
    -e "PGADMIN_DEFAULT_EMAIL=user@domain.com" \
    -e "PGADMIN_DEFAULT_PASSWORD=SuperSecret" \
    -d dpage/pgadmin4
```

`docker inspect <CONTAINER ID> | grep IPAddress`
