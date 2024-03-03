# Deploying PokeClone App with Docker Compose

This README outlines the steps needed to deploy the PokeClone application using Docker Compose, including setting up the environment, building, and running the containers.

## Prerequisites

- Docker and Docker Compose installed on your system.
- Clone or download the PokeClone application source code to your local machine.

## Diagram

![Docker Compose Deployment Diagram](/images/docker.png)

## Configuration

1. **Environment File Setup**: Create a `.env` file in the `back_end` directory of your project. This file will store environment variables required by the Django application.

    ```plaintext
    DJANGO_KEY='pikachu'
    ```

    Replace `'pikachu'` with your actual Django secret key or keep it as is for testing purposes.

2. **Docker Compose File**: Ensure your `docker-compose.yml` file is properly set up to define services for the front end, back end, and database. It should look something like this:

    ```yaml
    version: '3.8'

    services:
      database:
        image: postgres:latest
        volumes:
          - postgres_data:/var/lib/postgresql/data
          - postgres_config:/etc/postgresql
        environment:
          POSTGRES_DB: pokeclone_db
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
        networks:
          - database_network
        healthcheck:
          test: ["CMD", "pg_isready", "-d", "pokeclone_db", "-U", "postgres"]
          timeout: 20s
          retries: 10

      backend:
        build: ./back_end
        command: python manage.py runserver 0.0.0.0:8000
        volumes:
          - ./back_end:/app
        ports:
          - "8000:8000"
        environment:
          - DJANGO_KEY=pikachu
          - DATABASE_HOST=database
          - DATABASE_NAME=pokeclone_db
          - DATABASE_USER=postgres
          - DATABASE_PASSWORD=postgres
        depends_on:
          database:
            condition: service_healthy
        networks:
          - pokeclone_network
          - database_network
        env_file:
          - ./back_end/.env

      frontend:
        build: ./front_end
        ports:
          - "8080:80"
        depends_on:
          - backend
        networks:
          - pokeclone_network

    networks:
      pokeclone_network:
        driver: bridge
      database_network:
        driver: bridge

    volumes:
      postgres_data:
      postgres_config:
    ```

## Deployment Steps

1. **Build and Start Containers**: Navigate to the root directory of the PokeClone project where your `docker-compose.yml` file is located. Run the following command to build and start all services defined in the Docker Compose file:

    ```bash
    docker compose up -d --build
    ```

    The `-d` flag runs the containers in the background. The `--build` option builds the images before starting the containers.

2. **Applying Database Migrations**: After the containers are up and running, apply the Django database migrations to set up the database schema:

    ```bash
    docker compose exec backend python manage.py migrate
    ```

3. **Create a Django Superuser**: Optionally, if you need to access the Django admin, create a superuser account:

    ```bash
    docker compose exec backend python manage.py createsuperuser
    ```

    Follow the prompts to set up the superuser account.

4. **Restart the Backend Container**: After applying migrations and creating a superuser, it's a good practice to restart the backend container to ensure all changes are correctly loaded:

    ```bash
    docker compose restart backend
    ```

## Accessing the Application

- **Front End**: The front-end application will be available at `http://localhost:8080`.
- **Back End/Django Admin**: Access the Django admin interface at `http://localhost:8000/admin` using the superuser credentials you created.

## Stopping the Application

To stop and remove the containers, networks, and volumes created by `docker-compose up`, run:

```bash
docker compose down -v
```

The `-v` flag is used to remove the volumes, ensuring a clean state.

## Conclusion

You've now deployed the PokeClone application using Docker Compose, including setting up a PostgreSQL database, a Django back end, and a React front end. This setup provides a solid foundation for development and testing.
